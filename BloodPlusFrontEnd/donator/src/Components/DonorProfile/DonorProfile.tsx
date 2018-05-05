import * as React from 'react';
import { VBox, HBox } from 'react-stylesheet';
import { IDonorGet } from '../../Models/IDonorGet';
import { DonorProfileService } from '../../Services/DonorProfileService';
import { TextField } from '../../utils/TextField';
import update from 'react-addons-update';
import './DonorProfile.css';
import Avatar from 'react-avatar'
import * as ReactBootstrap from 'react-bootstrap'
import PasswordField from 'material-ui-password-field'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export interface DonorProfileProps{

}
interface DonorProfileState{
    donor:IDonorGet;
    isLoading:boolean;
    bgColor:string;
    newPassword:string;
}
export class DonorProfile extends React.Component<DonorProfileProps,DonorProfileState>
{
    constructor(props:DonorProfileProps){
        super(props);
        this.state=
        {
            donor:
                {
                    firstname:'',
                    lastname:'',
                    email:'',
                    CNP:'',
                    city:'',
                    street:'',
                    number:0,
                    county:'',
                    confirmPassword:'',
                    password:''
                },
            newPassword:'',
            isLoading: true,
            bgColor: 'gray'
        }
    };

    componentDidMount(){
    
        // DoctorProfileService.getDoctor().then((doctor:IDoctorGet) => {
        //     this.setState({
        //         doctor: doctor
        //     });    
        // });
        
    }

    handleLastNameChange(event: any) {
        this.setState({
            donor: update(this.state.donor, { lastname: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleFirstNameChange(event: any) {
        this.setState({
            donor: update(this.state.donor, { firstname: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleEmailChange(event:any){
        this.setState({
            donor: update(this.state.donor, { email: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleCNPChange(event:any){
        this.setState({
            donor: update(this.state.donor, { CNP: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }  

    handleStreetChange(event:any){
        this.setState({
            donor: update(this.state.donor, { street: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleCountyChange(event:any){
        this.setState({
            donor: update(this.state.donor, { county: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleCityChange(event:any){
        this.setState({
            donor: update(this.state.donor, { city: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleNumberChange(event:any){
        this.setState({
            donor: update(this.state.donor, { number: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }
    
    handleCPassChange(event:any){
        this.setState({
            donor: update(this.state.donor, { password: { $set: event.target.value } }),
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
            donor: update(this.state.donor, { confirmPassword: { $set: event.target.value } }),
            isLoading: false,
            bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleSave(event:any){
        alert("S-a apasat")
    }

    handleCancel(event:any){
        this.setState({
            isLoading: true,
            bgColor: 'gray',
            newPassword:'',
            donor: update(this.state.donor,{password:{$set:''},confirmPassword:{$set:''}})
        });
        // DoctorProfileService.getDoctor().then((doctor:IDoctorGet) => {
        //     this.setState({
        //         doctor: doctor
        //     });    
        // });
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
                    </VBox>
                    <VBox className="VBox2">
                        <div>
                            <h1 className="mainTitles">Info</h1>
                        </div>
                        <div className="separation2"></div>
                        <TextField text="Nume" type="text" value={this.state.donor.lastname} onChangeFunction={(event) => this.handleLastNameChange(event)} />
                        <TextField text="Prenume" type="text" value={this.state.donor.firstname} onChangeFunction={(event)=>this.handleFirstNameChange(event)} />
                        <TextField text="Email" type="text" value={this.state.donor.email} onChangeFunction={(event)=>this.handleEmailChange(event)} />
                        <TextField text="CNP" type="text" value={this.state.donor.CNP} onChangeFunction={(event)=>this.handleCNPChange(event)}/>
                        <TextField text="Oras" type="text" value={this.state.donor.city} onChangeFunction={(event)=>this.handleCityChange(event)} />
                        <TextField text="Judet" type="text" value={this.state.donor.county} onChangeFunction={(event)=>this.handleCountyChange(event)} />
                        <TextField text="Strada" type="text" value={this.state.donor.street} onChangeFunction={(event)=>this.handleStreetChange(event)} />
                        <TextField text="Numar" type="text" value={this.state.donor.number.toString(10)} onChangeFunction={(event)=>this.handleNumberChange(event)} />
                    </VBox>
                    <VBox className="VBox3">
                        <div>
                            <h1 className="mainTitles">Schimbă parola</h1>
                        </div>
                        <div className="separation2"></div>
                        <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <PasswordField value={this.state.donor.password}className="passField" onChange={(event) => this.handleCPassChange(event)} hintText="Cel puțin 8 caractere" floatingLabelText="Introdu parola curentă" />
                        <PasswordField value={this.state.newPassword} onChange={(event) => this.handleNewPassChange(event)} hintText="Cel puțin 8 caractere" floatingLabelText="Introdu noua parolă" />
                        <PasswordField value={this.state.donor.confirmPassword} onChange={(event) => this.handleConfirmPassChange(event)} floatingLabelText="Confirmă noua parolă" />
                        </MuiThemeProvider>
                        <br/><br/><br/><br/><br/><br/><br/><br/>
                        <HBox className="HBoxButtons">
                            <ReactBootstrap.Button disabled={isLoading} style={{backgroundColor:this.state.bgColor}} className="button" onClick={(event)=>this.handleSave(event)}>Salvează</ReactBootstrap.Button>
                            <ReactBootstrap.Button disabled={isLoading} style={{backgroundColor:this.state.bgColor}} className="button" onClick={(event)=>this.handleCancel(event)}>Anulează</ReactBootstrap.Button>
                        </HBox>
                    </VBox>
                </HBox>
                </div>
            </div>    
        );
    }
}