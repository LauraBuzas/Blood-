import * as React from 'react';
import './EmployeeProfile.css';
import { IEmployeeGet } from '../../Models/IEmployeeGet';
import {IEmployeeProfile} from '../../Models/IEmployeeProfile';
import Alert from 'react-s-alert';
import {TextField} from '../../utils/TextField';
//import {Button1} from '../../utils/Button1';
import {HBox,VBox} from '../../../node_modules/react-stylesheet';
//import {Avatar} from '../../../node_modules/react-avatar';
import Avatar from 'react-avatar';
import { EmployeeProfileService } from '../../Services/EmployeeProfileService';
//import * as ReactBootstrap from 'react-bootstrap';
import update from 'react-addons-update';

export interface EmployeeProfileProps{

}
interface EmployeeProfileState{
    employee: IEmployeeGet;
    message:string;
    centerName:string;

    //firstName:string;
    //lastName:string;
    //age:number;
}

export class EmployeeProfile extends React.Component<EmployeeProfileProps,EmployeeProfileState>
{
    constructor(props:EmployeeProfileProps){
        super(props);

        this.state=
        {
            employee:{
                email:'',
                password:'',
                firstname:'',
                lastname:'',
                confirmPassword:'',
                centerId:0

            },
            message:'',
            centerName:'',
            
            
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
                            <TextField text="Nume" type="text" value={this.state.employee.lastname} onChangeFunction={(event) =>this.handleLastNameChange(event)}/>
                            <TextField text="Prenume" type="text" value={this.state.employee.firstname} onChangeFunction={(event) =>this.handleFirstNameChange(event)}/>
                            <TextField text="Email" type="text" value={this.state.employee.email} onChangeFunction={(event) =>this.handleEmailChange(event)}/>  
                            <TextField text="Centru" type="text"  value ={this.state.centerName} onChangeFunction={(event)=>this.handleCenterChange(event)}/>                        
                            <button    className="btnSaveChanges"  onClick={(event) => this.handleSave(event)}>
                            Salvează modificările
                            </button>
                            
                        </VBox>
                    </HBox>
                </div>
                <Alert stack={true} timeout={2000} />
            </div>
    )
        
    }

    componentDidMount() {
        
    
        
        console.log(this.state.employee.firstname);
        EmployeeProfileService.getEmployee().then((employee:IEmployeeGet) => {
            this.setState({
                employee: employee
                
            });    
        },
            (error) => {
                this.setState({
                    message: "A apărut o eroare la aducerea datelor despre angajat"
                    
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
            });

        EmployeeProfileService.getCenterName().then((name:any) => {
            this.setState({
                centerName:name
            });
        },
        (error) => {
            this.setState({
                message: "A apărut o eroare la aducerea numelui centrului"
                
            });
            Alert.error(this.state.message, {
                position: 'top-right',
                effect: 'jelly'
              });
        });
    }

    

    handleLastNameChange(event:any){
        this.setState({
            employee: update(this.state.employee, { lastname:{$set: event.target.value}})
        });
    }

    handleFirstNameChange(event:any){
        this.setState({
            employee: update(this.state.employee, { firstname:{$set: event.target.value}})
        });
    }
    
    handleEmailChange(event:any){
        this.setState({
            employee: update(this.state.employee, { email:{$set: event.target.value}})
        });
    }

    handleCenterChange(event:any){
        Alert.error("Nu se poate modifica centrul", {
            position: 'top-right',
            effect: 'jelly'
          });
    }

    handleSave(event:any){
        var completed = true;
        if(this.state.employee.firstname == "" || this.state.employee.lastname == "" || this.state.employee.email == "")
            completed = false;
        if(!completed){
            Alert.error("Completati toate campurile", {
                position: 'top-right',
                effect: 'jelly'
              });
        }else{
            EmployeeProfileService.saveProfileChanges(this.state.employee);
        }
    }
    


}