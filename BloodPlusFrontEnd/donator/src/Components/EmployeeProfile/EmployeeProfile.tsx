import * as React from 'react';
import './EmployeeProfile.css';
import {IEmployeeProfile} from '../../Models/IEmployeeProfile';
import {TextField} from '../../utils/TextField';
//import {Button1} from '../../utils/Button1';
import {HBox,VBox} from '../../../node_modules/react-stylesheet';
//import {Avatar} from '../../../node_modules/react-avatar';
import Avatar from 'react-avatar';
//import * as ReactBootstrap from 'react-bootstrap';

export interface EmployeeProfileProps{

}
interface EmployeeProfileState{
    firstName:string;
    lastName:string;
    age:number;
}

export class EmployeeProfile extends React.Component<EmployeeProfileProps,EmployeeProfileState>
{
    constructor(props:EmployeeProfileProps){
        super(props);

        this.state=
        {
            firstName:'',
            lastName:'',
            age:0,
        };
    }

    render(){
        return(
            
            <div className="Employee">
            <div className="separation">
            </div>
            <div className="title">
                <h1> Profil angajat </h1>
            </div>
            <div className="separation">
            </div>
                <div className="orizontal">
                    <HBox>
                        <div className="avatar">
                            <Avatar name="mircea bravo" size={200} src='https://cdn3.iconfinder.com/data/icons/medicalicons/PNG_256x256/doctor_assistant.png'/>
                            <button className='btnUploadImage' onClick={(event) => alert("Not implemented yet :)")}>
                            Încarcă<br/>altă imagine
                            </button>
                        </div >
                        <VBox>
                            <h3 className='title'>Informații profil</h3>
                            <div className="separation">
                            </div>
                            <TextField text="Nume" type="text" onChangeFunction={this.handleLastNameChange.bind(this)}/>
                            <TextField text="Prenume" type="text" onChangeFunction={this.handleFirstNameChange.bind(this)}/>
                            <TextField text="Varsta" type="number" onChangeFunction={this.handleAgeChange.bind(this)}/>
                                                      
                            <button    className="btnSaveChanges"  onClick={(event) => alert("Not implemented yet :)")}>
                            Salvează modificările
                            </button>
                            
                        </VBox>
                    </HBox>
                </div>

            </div>
    )
        
    }

    handleLastNameChange(evemt:any){

    }
    handleFirstNameChange(evemt:any){

    }
    handleAgeChange(evemt:any){

    }


}