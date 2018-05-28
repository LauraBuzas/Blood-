import * as React from 'react'
import Modal from "react-responsive-modal";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ISelection } from '../../../Models/ISelection';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../../../css/Button.css'
import Alert from 'react-s-alert';
import { TextField } from '../../../utils/TextField';
// import './ModalDoctorRequest.css'
import { IAddBloodBag } from '../../../Models/IAddBloodBag';
import { EmployeeService } from '../../../Services/EmployeeService';
import { BloodStockModel } from '../../../Models/BloodStockModel';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export interface ModalAddBloodBagProps
{
    onClose:any
}
interface ModalAddBloodBagState
{
    open:boolean,
    selectedGroup:ISelection;
    cnp:string;
    addPatient:boolean,
    rh:string
    errors:string[]
}
export class ModalAddBloodBag extends React.Component<ModalAddBloodBagProps,ModalAddBloodBagState>
{
    constructor(props:ModalAddBloodBagProps)
    {
        super(props);
        this.state=
            {
                selectedGroup:
                {
                    value:undefined,
                    label:''
                },
                cnp:'',              
                open: true,
                addPatient:false,
                rh:null,
                errors:[]
            }
        this.handleChangeGroup=this.handleChangeGroup.bind(this);
    }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  handleChangeGroup = (selectedGroup) => {
       
    if(selectedGroup!=null)
    {
        this.setState({ selectedGroup });
    }
    else
    {
        this.setState({selectedGroup:{value:undefined,label:''}})
    }
}

    handleChangeRh=(newRh)=>
    {     
        this.setState({rh:newRh}) 
    }

    validateRequest(errors:String[])
    {
        if(this.state.cnp==null)
            errors.push("Completați CNP donatorului")
        if(this.state.selectedGroup.value==undefined)
            errors.push("Specificați grupa de sânge")
        if(this.state.rh==null)
            errors.push("Specificați grupa de sânge")
        return errors;
    }

    addBloodBag(event: any) {
        event.preventDefault();
        let errors=[];
        var allErrors=this.validateRequest(errors);
        if(allErrors.length==0)
        { 
            let bloodBag:IAddBloodBag;
            bloodBag=
            {
                CNP:this.state.cnp,
                rh:this.state.rh,
                bloodType:this.state.selectedGroup.value
            }

            EmployeeService.addBloodBag(bloodBag).then((resp) => {
                Alert.success("Punga de sânge a fost adaugată.  Verificați stocul", {
                    position: 'top-right',
                    effect: 'jelly'
                  });
                  this.setState({open:false});
                
    
            },
                (error) => {
                    Alert.error("Nu s-a putut adauga punga de sânge. Verificați datele donatorului", {
                        position: 'top-right',
                        effect: 'jelly'
                      });
                });
        }
        else
        {
            allErrors.forEach(element => {
                Alert.error(element, {
                    position: 'top-right',
                    effect: 'jelly'
                });       
            })
        }
    }

    handleCnpChange(event: any) {
        this.setState({
            cnp: event.target.value
        });
    }


  render() {
    const { open } = this.state;

    const { selectedGroup } = this.state;
    const valueGroup = selectedGroup && selectedGroup.value;

    return (
      <div style={styles}>
        
        <Modal open={open} onClose={this.onCloseModal} large>
          <div className="vboxWithSpace">
          <h2>Adaugă o pungă de sânge</h2>
          <hr className="invisibleHr"/>

        <TextField text="CNP donator" type="text" onChangeFunction={(event) => this.handleCnpChange(event)} />  

        <Select
                name="dropdown-group"
                value={valueGroup}
                clearable={true}
                placeholder='Selectați grupa de sânge...'
                onChange={this.handleChangeGroup}
                options={[
                { value: 'O1', label: 'O(I)' },
                { value: 'A2', label: 'A(II)' },
                { value: 'B3', label: 'B(III)' },
                { value: 'AB4', label: 'AB(IV)' },
                ]}
        />        

        <RadioGroup onChange={ this.handleChangeRh } horizontal>
            <RadioButton value="NEGATIV" iconInnerSize={7} iconSize={17} pointColor="#f70606c7">RH Negativ</RadioButton>
            <RadioButton value="POZITIV" iconInnerSize={7} iconSize={17} pointColor="#f70606c7">RH Pozitiv</RadioButton>   
        </RadioGroup>
        
        <button className="buttonAddBloodBag" onClick={(event) => this.addBloodBag(event)}>Adaugă pungă de sânge</button>
     
        <Alert stack={true} timeout={5000} />
        </div>
        </Modal>
      </div>
    );
  }
}

