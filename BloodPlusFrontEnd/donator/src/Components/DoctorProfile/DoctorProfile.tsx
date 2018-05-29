import * as React from 'react';
import { VBox, HBox } from 'react-stylesheet';
import { IDoctorGet } from '../../Models/IDoctorGet';
import { IDoctorProfile } from '../../Models/IDoctorProfile';
import { IPasswordUpdate} from '../../Models/IPasswordUpdate';
import { DoctorProfileService } from '../../Services/DoctorProfileService';
import { TextField } from '../../utils/TextField';
import update from 'react-addons-update';
import './DoctorProfile.css';
import Avatar from 'react-avatar'
import * as ReactBootstrap from 'react-bootstrap'
import PasswordField from 'material-ui-password-field'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Alert from 'react-s-alert';
export interface DoctorProfileProps{

}
interface DoctorProfileState{
    doctor:IDoctorGet;
    isLoading:boolean;
    bgColor:string;
    hospitalName:string;
    newPassword:string;
}
export class DoctorProfile extends React.Component<DoctorProfileProps,DoctorProfileState>
{
    constructor(props:DoctorProfileProps){
        super(props);
        this.state=
        {
            doctor:
                {
                    firstname:'',
                    lastname:'',
                    email:'',
                    speciality:'',
                    ward:'',
                    //hospitalId:'',
                    confirmPassword:'',
                    password:''
                },
            newPassword:'',
            isLoading: true,
            bgColor: 'gray',
            hospitalName:''
        }
    };

    componentDidMount(){
    
        DoctorProfileService.getDoctor().then((doctor:IDoctorGet) => {
            this.setState({
                doctor: doctor
            });    
        });
        DoctorProfileService.getHospitalForDoctor().then((hospitalName:string) =>{
            this.setState({
                hospitalName:hospitalName
            });
        });
        
    }

    handleLastNameChange(event: any) {
        this.setState({
            doctor: update(this.state.doctor, { lastname: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleFirstNameChange(event: any) {
        this.setState({
            doctor: update(this.state.doctor, { firstname: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleEmailChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { email: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleSpecialityChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { speciality: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }  

    handleWardChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { ward: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }
    
    handleCPassChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { password: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleNewPassChange(event:any){
        this.setState({
            newPassword:event.target.value ,
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleConfirmPassChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { confirmPassword: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleHospitalChange(event:any){
        Alert.error("Nu se poate modifica spitalul!", {
            position: 'top-right',
            effect: 'jelly'
        });
    }

    handleSave(event:any){
        let ok1=true,ok2=true,ok3=true;
        if(this.state.doctor.firstname=='' || this.state.doctor.lastname=='' || this.state.doctor.email=='' || this.state.doctor.speciality=='' || this.state.doctor.ward=='')
        {    
            Alert.error("Completați toate câmpurile!", {
                position: 'top-right',
                effect: 'jelly'
            });
            ok1=false;
        }
        if(this.state.doctor.password=='' || this.state.doctor.confirmPassword=='' || this.state.newPassword==''){
            // Alert.error("Câmpurile de parolă necompletate!", {
            //     position: 'top-right',
            //     effect: 'jelly'
            // });
            ok2=false;
        }
        if(this.state.newPassword!=this.state.doctor.confirmPassword && this.state.newPassword!='' && this.state.doctor.confirmPassword!=''){
            Alert.error("Parolă nouă incompatibilă", {
                position: 'top-right',
                effect: 'jelly'
            });
            ok3=false;
        }
        if(ok1==true){
            let doctorUpdate={
                email:this.state.doctor.email,
                firstname:this.state.doctor.firstname,
                lastname:this.state.doctor.lastname,
                speciality:this.state.doctor.speciality,
                ward:this.state.doctor.ward
            }
            DoctorProfileService.updateInfo(doctorUpdate);
            this.setState({
                isLoading: true,
                bgColor: 'gray'
            });
            Alert.success("Schimbările au fost salvate", {
                position: 'top-right',
                effect: 'jelly'
            });
        }
        if(ok2==true && ok3==true){
             let passwordUpdate: IPasswordUpdate = {
                oldPassword:this.state.doctor.password,
                newPassword:this.state.newPassword,
                confirmPassword:this.state.doctor.confirmPassword
            }
            DoctorProfileService.updatePassword(passwordUpdate).then((response:any) => {
                Alert.error("Parolă invalidă!\nParola trebuie să aibă minim 6 caractere(literă mare,mică,cifre și un caracter special)", {
                    position: 'top-right',
                    effect: 'jelly'
                });
            });
            this.setState({
                isLoading: true,
                bgColor: 'gray'
            });
            Alert.success("Schimbările au fost salvate", {
                position: 'top-right',
                effect: 'jelly'
            });
        }
            
    }

    handleCancel(event:any){
        this.setState({
            isLoading: true,
            bgColor: 'gray',

            newPassword:'',
            doctor: update(this.state.doctor,{password:{$set:''},confirmPassword:{$set:''}})
        });
        DoctorProfileService.getDoctor().then((doctor:IDoctorGet) => {
            this.setState({
                doctor: doctor
            });    
        });
    }

    render(){
        const {isLoading}=this.state;
        return(
            <div className="main">
                <div className="separation"></div>
                <div>
                <h1 className="title">Profil doctor</h1>
                </div>
                <div className="separation"></div>
                <div className="main">
                <HBox className="hBox">
                    <VBox ClassName="VBox1">
                        <Avatar className="avatar" src="https://cdn.iconscout.com/public/images/icon/premium/png-512/doctor-physician-practitioner-stethoscope-30ca83c0ae2fdffb-512x512.png" size={200} round={true}/> <br/>
                        <TextField text="Nume spital" type="text" value={this.state.hospitalName} onChangeFunction={(event)=>this.handleHospitalChange(event)}/>
                    </VBox>
                    <VBox className="VBox2">
                        <div>
                            <h1 className="mainTitles">Info</h1>
                        </div>
                        <div className="separation2"></div>
                        <TextField text="Nume" type="text" value={this.state.doctor.lastname} onChangeFunction={(event) => this.handleLastNameChange(event)} />
                        <TextField text="Prenume" type="text" value={this.state.doctor.firstname} onChangeFunction={(event)=>this.handleFirstNameChange(event)} />
                        <TextField text="Email" type="text" value={this.state.doctor.email} onChangeFunction={(event)=>this.handleEmailChange(event)} />
                        <TextField text="Specializare" type="text" value={this.state.doctor.speciality} onChangeFunction={(event)=>this.handleSpecialityChange(event)}/>
                        <TextField text="Secție" type="text" value={this.state.doctor.ward} onChangeFunction={(event)=>this.handleWardChange(event)} />

                    </VBox>
                    <VBox className="VBox3">
                        <div>
                            <h1 className="mainTitles">Schimbă parola</h1>
                        </div>
                        <div className="separation2"></div>
                        <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <PasswordField value={this.state.doctor.password}className="passField" onChange={(event) => this.handleCPassChange(event)} hintText="Cel puțin 8 caractere" floatingLabelText="Introdu parola curentă" />
                        <PasswordField value={this.state.newPassword} onChange={(event) => this.handleNewPassChange(event)} hintText="Cel puțin 8 caractere" floatingLabelText="Introdu noua parolă" />
                        <PasswordField value={this.state.doctor.confirmPassword} onChange={(event) => this.handleConfirmPassChange(event)} floatingLabelText="Confirmă noua parolă" />
                        </MuiThemeProvider>
                        <br/><br/><br/><br/><br/><br/><br/><br/>
                        <HBox className="HBoxButtons">
                            <ReactBootstrap.Button disabled={isLoading} style={{backgroundColor:this.state.bgColor}} className="button" onClick={(event)=>this.handleSave(event)}>Salvează</ReactBootstrap.Button>
                            <ReactBootstrap.Button disabled={isLoading} style={{backgroundColor:this.state.bgColor}} className="button" onClick={(event)=>this.handleCancel(event)}>Anulează</ReactBootstrap.Button>
                        </HBox>
                    </VBox>
                </HBox>
                </div>
                <Alert stack={true} timeout={3000}/>
            </div>    
        );
    }
}