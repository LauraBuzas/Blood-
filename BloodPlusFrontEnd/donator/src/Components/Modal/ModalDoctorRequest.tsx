import * as React from 'react'
import Modal from "react-responsive-modal";
import Select from 'react-select';
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import { ISelection } from '../../Models/ISelection';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../../css/Button.css'
import { IPatient } from '../../Models/IPatient';
import { DoctorService } from '../../Services/DoctorService';
import Alert from 'react-s-alert';
import { StickyNote } from '../StickyNote/StickyNote';
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export interface ModalDoctorRequestProps
{

}
interface ModalDoctorRequestState
{
    open:boolean,
    selectedGroup:ISelection;
    selectedLevel:ISelection;
    selectedPacient:ISelection;
    optionsPatients:ISelection[];
}
export class ModalDoctorRequest extends React.Component<ModalDoctorRequestProps,ModalDoctorRequestState>
{
    constructor(props:ModalDoctorRequestProps)
    {
        super(props);
        this.state=
            {
                selectedGroup:
                {
                    value:undefined,
                    label:''
                },
                selectedLevel:
                {
                    value:undefined,
                    label:''
                },
                selectedPacient:
                {
                    value:undefined,
                    label:''
                },
                open: false,
                optionsPatients:[]
            }
        this.handleChangeGroup=this.handleChangeGroup.bind(this);
        this.handleChangeLevel=this.handleChangeLevel.bind(this);
        this.handleChangePacient=this.handleChangePacient.bind(this);
            

    }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleChangePacient = (selectedPacient) => {
       
    if(selectedPacient!=null)
    {
        this.setState({ selectedPacient });
        console.log(`Selected: ${selectedPacient.label}`);
    }
    else
    {
        this.setState({selectedPacient:{value:undefined,label:''}})
        console.log("aici");
    }
  }

  handleChangeGroup = (selectedGroup) => {
       
    if(selectedGroup!=null)
    {
        this.setState({ selectedGroup });
        console.log(`Selected: ${selectedGroup.label}`);
    }
    else
    {
        this.setState({selectedGroup:{value:undefined,label:''}})
    }

}
handleChangeLevel = (selectedLevel) => {

if(selectedLevel!=null)
{
    this.setState({ selectedLevel });
    console.log(`Selected: ${selectedLevel.label}`);
}
else
{
    this.setState({selectedLevel:{value:undefined,label:''}})
}
}

handleChangeRh=(newRh)=>
{
    
}

sendRequest(event)
{

}

newPatient(option)
{
    console.log(option);
    //extend form adauga pacient
}

componentDidMount()
{
    DoctorService.getHospitalizedPatients().then((patients:IPatient[]) => {
        let optionsPatients:ISelection[];
        patients.forEach(element => {
            let option:ISelection;
            option.value=element.CNP;
            option.label=element.CNP+" ( "+element.fullname+" )";
            
        });
        this.setState({
            optionsPatients:optionsPatients
        })      
    },
        (error) => {
            Alert.error("A apărut o eroare la aducerea pacientilor", {
                position: 'top-right',
                effect: 'jelly'
              });
        });

}

  render() {
    const { open } = this.state;

    const { selectedPacient } = this.state;
    const valuePacient = selectedPacient && selectedPacient.value;

    const { selectedGroup } = this.state;
    const valueGroup = selectedGroup && selectedGroup.value;

    const { selectedLevel } = this.state;
    const valueLevel = selectedLevel && selectedLevel.value;

    return (
      <div style={styles}>
        <h2>react-responsive-modal</h2>
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Cerere sânge</h2>
          <Creatable
            name="dropdown-pacient"
            value={valuePacient}
            clearable={true}
            creatable={true}
            onNewOptionClick={this.newPatient}
            placeholder='Căutați pacientul dupa CNP...'
            onChange={this.handleChangePacient}
            options={[
            { value: '0', label: 'Pacient 1' },
            { value: '1', label: 'Pacient 2' },
            ]} 
              
         />

        <Select
                    name="dropdown-level"
                    value={valueLevel}
                    clearable={true}
                    placeholder='Selectați nivelul de urgență...'
                    onChange={this.handleChangeLevel}
                    options={[
                    { value: '0', label: 'Scăzut' },
                    { value: '1', label: 'Mediu' },
                    { value: '2', label: 'Ridicat' },
                    
                    ]}     
            />

        <Select
                name="dropdown-group"
                value={valueGroup}
                clearable={true}
                placeholder='Selectați grupa de sânge a pacientului...'
                onChange={this.handleChangeGroup}
                options={[
                { value: '0', label: 'O(I)' },
                { value: '1', label: 'A(II)' },
                { value: '2', label: 'B(III)' },
                { value: '3', label: 'AB(IV)' },
                ]}
                
        />

        <RadioGroup onChange={ this.handleChangeRh } horizontal>
            <RadioButton value="0" iconInnerSize={7} iconSize={17} pointColor="#f70606c7">RH Negativ</RadioButton>
            <RadioButton value="1" iconInnerSize={7} iconSize={17} pointColor="#f70606c7">RH Pozitiv</RadioButton>   
        </RadioGroup>

        <button className="buttonSendRequest" onClick={(event) => this.sendRequest(event)}>Trimite</button>

        <Alert/>

        </Modal>
      </div>
    );
  }
}

