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
import { TextField } from '../../utils/TextField';
import './ModalDoctorRequest.css'
import { IPatientAdd } from '../../Models/IPatientAdd';
import { IDoctorRequest } from '../../Models/IDoctorRequest';

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
    selectedComponent:ISelection;
    selectedPacient:ISelection;
    optionsPatients:ISelection[];
    addPatient:boolean,
    patient:IPatientAdd,
    quantity:number,
    rh:string
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
                selectedComponent:
                {
                    value:undefined,
                    label:''
                },
                selectedLevel:
                {
                    value:undefined,
                    label:''
                },
                selectedPacient:undefined,
                open: false,
                optionsPatients:[],
                addPatient:false,
                patient:
                {
                    CNP:'',
                    firstname:null,
                    lastname:null,
                    city:null,
                    apartment:null,
                    country:null,
                    nr:null,
                },
                quantity:0,
                rh:''
            }
        this.handleChangeGroup=this.handleChangeGroup.bind(this);
        this.handleChangeComponent=this.handleChangeComponent.bind(this);
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
        if(selectedPacient.value==selectedPacient.label)
            this.setState({addPatient:true})
        else  this.setState({addPatient:false})
        this.setState({ selectedPacient });
    }
    else
    {
        this.setState({selectedPacient:{value:undefined,label:''}})
    }
  }

  handleChangeComponent = (selectedComponent) =>{ 
       
    if(selectedComponent!=null)
    {
        this.setState({selectedComponent});
    }
    else
    {
        this.setState({selectedGroup:{value:undefined,label:''}})
    }
  }

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

    handleChangeLevel = (selectedLevel) => {

    if(selectedLevel!=null)
    {
        this.setState({ selectedLevel });
    }
    else
    {
        this.setState({selectedLevel:{value:undefined,label:''}})
    }
    }

    handleChangeRh=(newRh)=>
    {
     
        this.setState({rh:newRh})
    }

    sendRequest(event)
    {
        let newPatient:IPatientAdd
        newPatient=this.state.patient;
        newPatient.CNP=this.state.selectedPacient.value;
        this.setState({patient:newPatient})

        let request:IDoctorRequest
        request=
        {
            patient:this.state.patient,
            bloodType:this.state.selectedGroup.value,
            emergencyLevel:this.state.selectedLevel.label,
            reguestedQuantity:this.state.quantity,
            rh:this.state.rh,
            component:this.state.selectedComponent.value
        }

        DoctorService.addRequest(request).then((request:any) => {
           console.log(request);
        },
            (error) => {
                Alert.error("A apărut o eroare la trimitere request", {
                    position: 'top-right',
                    effect: 'jelly'
                  });
            });

        
    }


    handleFirstNameChange(event)
    {
        var fakePatient=this.state.patient;
        fakePatient.firstname=event.value;
        this.setState({patient:fakePatient})

    }

    handleLastNameChange(event)
    {
        var fakePatient=this.state.patient;
        fakePatient.lastname=event.value;
        this.setState({patient:fakePatient})
    }

    handleStreetChange(event)
    {
        var fakePatient=this.state.patient;
        fakePatient.street=event.value;
        this.setState({patient:fakePatient})
    }
    handleNumberChange(event)
    {
        var fakePatient=this.state.patient;
        fakePatient.nr=event.value;
        this.setState({patient:fakePatient})
    }
    handleFloorChange(event)
    {
        var fakePatient=this.state.patient;
        fakePatient.floor=event.value;
        this.setState({patient:fakePatient})
    }
    handleApartmentChange(event)
    {
        var fakePatient=this.state.patient;
        fakePatient.apartment=event.value;
        this.setState({patient:fakePatient})
    }
    handleCityChange(event)
    {
        var fakePatient=this.state.patient;
        fakePatient.city=event.value;
        this.setState({patient:fakePatient})
    }
    handleCountryChange(event)
    {
        var fakePatient=this.state.patient;
        fakePatient.country=event.value;
        this.setState({patient:fakePatient})
    }
    handleChangeQuantity(event)
    {
        this.setState({quantity:event.target.value});
    }

renderPatient()
{
    return(
    
        <div>
          <div className="hboxWithSpace">
            <TextField text="Nume" type="text" onChangeFunction={(event) => this.handleFirstNameChange(event)} />
            <TextField text="Prenume" type="text" onChangeFunction={(event) => this.handleLastNameChange(event)}/>
            <TextField text="Oraș" type="text" onChangeFunction={(event) => this.handleCityChange(event)}/>
            <TextField text="Țara" type="text" onChangeFunction={(event) => this.handleCountryChange(event)}/>
          </div>        
          <div className="hboxWithSpace">
            <TextField text="Stradă" type="text" onChangeFunction={(event) => this.handleStreetChange(event)}/>
            <TextField text="Număr" type="text" onChangeFunction={(event) => this.handleNumberChange(event)}/>
            <TextField text="Etaj" type="text" onChangeFunction={(event) => this.handleFloorChange(event)}/>
            <TextField text="Apartament" type="text" onChangeFunction={(event) => this.handleApartmentChange(event)}/>        
          </div>
        </div>
    )
}

componentWillMount()
{
    DoctorService.getHospitalizedPatients().then((patients:IPatient[]) => {
        if(patients!=null)
        {
            let optionsPatients:ISelection[];
            optionsPatients=[]
            patients.forEach(element => {
                let option:ISelection;
                option={
                    value:element.CNP,
                    label:element.CNP+" ( "+element.fullname+" )"
                }
                optionsPatients.push(option);
                
            });
            this.setState({
                optionsPatients:optionsPatients
            })    
        }  
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

    const { selectedComponent } = this.state;
    const valueComponent = selectedComponent && selectedComponent.value;


    return (
      <div style={styles}>
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={open} onClose={this.onCloseModal} large>
          <div className="vboxWithSpace">
          <h2>Cerere sânge</h2>
          <hr className="invisibleHr"/>
          <Creatable
            name="dropdown-pacient"
            creatable={true}
            placeholder='Nume sau CNP pacient...'
            onChange={this.handleChangePacient}
            options={this.state.optionsPatients}
            value={selectedPacient}
              
         />
         {console.log(this.state.optionsPatients)}
        {this.state.addPatient?this.renderPatient():null}

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
            { value: '3', label: 'Critic' },                  
            ]}     
            />
         
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

        <Select
                name="dropdown-component"
                value={valueComponent}
                clearable={true}
                placeholder='Selectați componenta...'
                onChange={this.handleChangeComponent}
                options={[
                { value: 'BloodBag', label: 'Sânge neseparat' },
                { value: 'Thrombocyte', label: 'Trombocite' },
                { value: 'Plasma', label: 'Plasmă' },
                { value: 'RedBloodCells', label: 'Globule roșii' },
                ]}
                
        />
        

        <RadioGroup size={1} onChange={ this.handleChangeRh } horizontal>
            <RadioButton size={1} value="0" iconInnerSize={7} iconSize={17} pointColor="#f70606c7">RH Negativ</RadioButton>
            <RadioButton value="1" iconInnerSize={7} iconSize={17} pointColor="#f70606c7">RH Pozitiv</RadioButton>   
        </RadioGroup>

        <div className="hboxWithSpace">
            <input type="number" className="input-cantitate" placeholder="Cantitatea ceruta..." min="1" onChange={(event)=>this.handleChangeQuantity(event)}/>
            <button className="buttonSendRequest" onClick={(event) => this.sendRequest(event)}>Trimite</button>
        </div>

        </div>
        <Alert/>

        </Modal>
      </div>
    );
  }
}

