import * as React from 'react'
import './DoctorRequest.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ISelection } from '../../Models/ISelection';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../../css/Button.css'
export interface DoctorRequestProps{}

interface DoctorRequestState
{
   selectedGroup:ISelection;
   selectedLevel:ISelection;
   selectedPacient:ISelection;
   
}

export class DoctorRequest extends React.Component<DoctorRequestProps,DoctorRequestState>
{
    

    constructor(props:DoctorRequestProps)
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
                }

        }
        this.handleChangeGroup=this.handleChangeGroup.bind(this);
        this.handleChangeLevel=this.handleChangeLevel.bind(this);
        this.handleChangePacient=this.handleChangePacient.bind(this);
        
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
    handleChangePacient = (selectedPacient) => {
       
        if(selectedPacient!=null)
        {
            this.setState({ selectedPacient });
            console.log(`Selected: ${selectedPacient.label}`);
        }
        else
        {
            this.setState({selectedPacient:{value:undefined,label:''}})
        }
    }
    handleChangeRh=(newRh)=>
    {
        
    }
    sendRequest(event)
    {

    }
    
    
    
    render()
    {
        const { selectedGroup } = this.state;
        const valueGroup = selectedGroup && selectedGroup.value;

        const { selectedLevel } = this.state;
        const valueLevel = selectedLevel && selectedLevel.value;

        const { selectedPacient } = this.state;
        const valuePacient = selectedPacient && selectedPacient.value;
        
        return(
            <div className="container-request">      
                <Select
                        name="dropdown-pacient"
                        value={valuePacient}
                        clearable={true}
                        placeholder='Selectați pacientul...'
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

               

            </div>
        )
    }
}