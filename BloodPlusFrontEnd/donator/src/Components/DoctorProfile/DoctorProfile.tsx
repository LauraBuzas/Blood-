import * as React from 'react';
import { VBox, HBox } from 'react-stylesheet';
import { IDoctorGet } from '../../Models/IDoctorGet';
import { IDoctorProfile } from '../../Models/IDoctorProfile';
import { TextField } from '../../utils/TextField';
import update from 'react-addons-update';
import './DoctorProfile.css';
import Avatar from 'react-avatar'
import * as ReactBootstrap from 'react-bootstrap'
import PasswordField from 'material-ui-password-field'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export interface DoctorProfileProps{

}
interface DoctorProfileState{
    doctor:IDoctorProfile;
    isLoading:boolean;
    bgColor:string;
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
                    hospitalName:'',
                    currentPass:'',
                    newPassword:''
                },
            isLoading: true,
            bgColor: 'gray'
        }
    };


    handleLastNameChange(event: any) {
        this.setState({
            doctor: update(this.state.doctor, { lastname: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleFirstNameChange(event: any) {
        this.setState({
            doctor: update(this.state.doctor, { firstname: { $set: event.target.value } })
        });
    }

    handleEmailChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { email: { $set: event.target.value } })
        });
    }

    handleSpecialityChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { speciality: { $set: event.target.value } })
        });
    }  

    handleWardChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { email: { $set: event.target.value } })
        });
    }
    
    handleCPassChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { currentPass: { $set: event.target.value } })
        });
    }

    handleNewPassChange(event:any){
        this.setState({
            doctor: update(this.state.doctor, { newPassword: { $set: event.target.value } })
        });
    }

    handleSave(event:any){
        alert("S-a apasat")
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
                        <Avatar className="avatar" src="https://cdn.iconscout.com/public/images/icon/premium/png-512/doctor-physician-practitioner-stethoscope-30ca83c0ae2fdffb-512x512.png" size="200" round={true}/> <br/>
                        {/* <input type="file"  accept=".png, .jpg, .jpeg " /> */}
                        <div className="buttonDiv">
                        <ReactBootstrap.Button className="button" onClick={(event)=>alert("heeei")}>Încarcă imagine</ReactBootstrap.Button>
                        </div>
                    </VBox>
                    <VBox className="VBox2">
                        <div>
                            <h1 className="mainTitles">Info</h1>
                        </div>
                        <div className="separation2"></div>
                        <TextField text="Nume" type="text" onChangeFunction={(event) => this.handleLastNameChange(event)} />
                        <TextField text="Prenume" type="text" onChangeFunction={(event)=>this.handleFirstNameChange(event)} />
                        <TextField text="Email" type="text" onChangeFunction={(event)=>this.handleEmailChange(event)} />
                        <TextField text="Specializare" type="text" onChangeFunction={(event)=>this.handleSpecialityChange(event)}/>
                        <TextField text="Secție" type="text" onChangeFunction={(event)=>this.handleWardChange(event)} />
                    </VBox>
                    <VBox className="VBox3">
                        <div>
                            <h1 className="mainTitles">Schimbă parola</h1>
                        </div>
                        <div className="separation2"></div>
                        <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <PasswordField className="passField" hintText="Cel puțin 8 caractere" floatingLabelText="Introdu parola curentă" />
                        <PasswordField hintText="Cel puțin 8 caractere" floatingLabelText="Introdu noua parolă" />
                        <PasswordField floatingLabelText="Confirmă noua parolă" />
                        </MuiThemeProvider>
                        <br/><br/><br/><br/><br/><br/><br/><br/>
                        <HBox className="HBoxButtons">
                            <ReactBootstrap.Button disabled={isLoading} style={{backgroundColor:this.state.bgColor}} className="button" onClick={(event)=>this.handleSave(event)}>Salvează</ReactBootstrap.Button>
                            <ReactBootstrap.Button disabled={isLoading} style={{backgroundColor:this.state.bgColor}} className="button">Anulează</ReactBootstrap.Button>
                        </HBox>
                    </VBox>
                </HBox>
                </div>
            </div>    
        );
    }
}