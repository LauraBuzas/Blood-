import * as React from 'react';
import './EmployeeProfile.css';
import '../../css/Button.css';
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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PasswordField from 'material-ui-password-field';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IPasswordUpdate } from '../../Models/IPasswordUpdate';

export interface EmployeeProfileProps{

}
interface EmployeeProfileState{
    employee: IEmployeeGet;
    message:string;
    centerName:string;
    newPassword:string;
    

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
            newPassword:'',
            
        };
    }

    render(){
        return(
            
            <div className="main-employee">
                
                {/* <Avatar id="avatar" style={{display: "block"}} name="mircea bravo" size={200} src='https://cdn3.iconfinder.com/data/icons/medicalicons/PNG_256x256/doctor_assistant.png'/> */}
                    {/* <button className='btnUploadImage' onClick={(event) => alert("Not implemented yet :)")}>
                    Încarcă<br/>altă imagine
                    </button> */}
                <VBox className="hBox">
                <div className="profile-fields">
                    
                    <h2 className='title'>Informații profil</h2>
                    
                    
                    <TextField text="Nume" type="text" value={this.state.employee.lastname} onChangeFunction={(event) =>this.handleLastNameChange(event)}/>
                    <TextField text="Prenume" type="text" value={this.state.employee.firstname} onChangeFunction={(event) =>this.handleFirstNameChange(event)}/>
                    <TextField text="Email" type="text" value={this.state.employee.email} onChangeFunction={(event) =>this.handleEmailChange(event)}/>  
                    <TextField text="Centru" type="text"  value ={this.state.centerName} onChangeFunction={(event)=>this.handleCenterChange(event)}/>

                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <PasswordField value={this.state.employee.password}className="passField" onChange={(event) => this.handleCPassChange(event)} hintText="Cel puțin 8 caractere" floatingLabelText="Introdu parola curentă" />
                    <PasswordField value={this.state.newPassword} onChange={(event) => this.handleNewPassChange(event)} hintText="Cel puțin 8 caractere" floatingLabelText="Introdu noua parolă" />
                    <PasswordField value={this.state.employee.confirmPassword} onChange={(event) => this.handleConfirmPassChange(event)} floatingLabelText="Confirmă noua parolă" />
                    </MuiThemeProvider>

                    <button className="generic-button"  onClick={(event) => this.handleSave(event)}>
                    Salvează modificările
                    </button>
                        
                    
                    
                </div>
                <Alert stack={true} timeout={2000} />
                </VBox>
                
                
                
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

    handleCPassChange(event:any){
        this.setState({
            employee: update(this.state.employee, { password: { $set: event.target.value } }),
    
            
        });
    }

    handleNewPassChange(event:any){
        this.setState({
            newPassword:event.target.value
            
        });
    }

    handleConfirmPassChange(event:any){
        this.setState({
            employee: update(this.state.employee, { confirmPassword: { $set: event.target.value } }),
            
        });
    }

    

    handleSave(event:any){
        var completed = true;
        var ok2=true,ok3=true;
        var currentPassMistake = false;
        if(this.state.employee.firstname == "" || this.state.employee.lastname == "" || this.state.employee.email == "")
            completed = false;

        if(this.state.employee.password=='' || this.state.employee.confirmPassword=='' || this.state.newPassword==''){
       
            ok2=false;
        }
        if(this.state.newPassword!=this.state.employee.confirmPassword && this.state.newPassword!='' && this.state.employee.confirmPassword!=''){
            Alert.error("Parolă nouă incompatibilă", {
                position: 'top-right',
                effect: 'jelly'
            });
            ok3=false;
        }

        if(!completed){
            Alert.error("Completati toate campurile", {
                position: 'top-right',
                effect: 'jelly'
              });
        }else{
            EmployeeProfileService.saveProfileChanges(this.state.employee);
            Alert.success("S-au salvat informatiile de profil cu succes", {
                position: 'top-right',
                effect: 'jelly'
              });
        }

        if(ok2==true && ok3==true){
            let passwordUpdate: IPasswordUpdate = {
               oldPassword:this.state.employee.password,
               newPassword:this.state.newPassword,
               confirmPassword:this.state.employee.confirmPassword
           }
           EmployeeProfileService.updatePassword(passwordUpdate).then((response:any) => {
               
            console.log("Raspunsu: "+response);
            if(response == "Invalid model!" || response == 'Invalid password!'){
                Alert.error("Parolă invalidă!\nParola trebuie să aibă minim 6 caractere(literă mare,mică,cifre și un caracter special)", {
                    position: 'top-right',
                    effect: 'jelly'
                });
            }else{
                Alert.success("Parola s-a modificat cu succes", {
                    position: 'top-right',
                    effect: 'jelly'
                });
            }
               
               
           });
          
       }
    }
    


}