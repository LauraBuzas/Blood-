import * as React from 'react';
import { VBox, HBox } from 'react-stylesheet';
import { IDonorGet } from '../../Models/IDonorGet';
import { DonorProfileService } from '../../Services/DonorProfileService';
import { TextField } from '../../utils/TextField';
import update from 'react-addons-update';
import './DonorProfile.css';
import '../../css/Button.css';
import Avatar from 'react-avatar'
import * as ReactBootstrap from 'react-bootstrap'
import PasswordField from 'material-ui-password-field'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Alert from 'react-s-alert';
import {IPasswordUpdate} from '../../Models/IPasswordUpdate'
export interface DonorProfileProps{

}
interface DonorProfileState{
    donor:IDonorGet;
    isLoading:boolean;
    //bgColor:string;
    newPassword:string;

    isPasswordChanging: boolean;
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
            //bgColor: 'gray',
            isPasswordChanging: false
        }
    };

    componentDidMount(){
    
        DonorProfileService.getDonor().then((donor:IDonorGet) => {
            this.setState({
                donor: donor
            });    
        });
        
    }

    handleLastNameChange(event: any) {
        this.setState({
            donor: update(this.state.donor, { lastname: { $set: event.target.value } }),
            isLoading: false,
            //bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleFirstNameChange(event: any) {
        this.setState({
            donor: update(this.state.donor, { firstname: { $set: event.target.value } }),
            isLoading: false,
            //bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleEmailChange(event:any){
        this.setState({
            donor: update(this.state.donor, { email: { $set: event.target.value } }),
            isLoading: false,
            //bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleCNPChange(event:any){
        Alert.error("Nu se poate modifica CNP-ul!", {
            position: 'top-right',
            effect: 'jelly'
        });
    }  

    handleStreetChange(event:any){
        this.setState({
            donor: update(this.state.donor, { street: { $set: event.target.value } }),
            isLoading: false,
           // bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleCountyChange(event:any){
        this.setState({
            donor: update(this.state.donor, { county: { $set: event.target.value } }),
            isLoading: false,
            //bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleCityChange(event:any){
        this.setState({
            donor: update(this.state.donor, { city: { $set: event.target.value } }),
            isLoading: false,
            //bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleNumberChange(event:any){
        this.setState({
            donor: update(this.state.donor, { number: { $set: event.target.value } }),
            isLoading: false,
            //bgColor: 'hsl(0, 98%, 68%)'
        });
    }
    
    handleCPassChange(event:any){
        this.setState({
            donor: update(this.state.donor, { password: { $set: event.target.value } }),
            isLoading: false,
            //bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleNewPassChange(event:any){
        this.setState({
            newPassword:event.target.value ,
            isLoading: false,
            //bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleConfirmPassChange(event:any){
        this.setState({
            donor: update(this.state.donor, { confirmPassword: { $set: event.target.value } }),
            isLoading: false,
            //bgColor: 'hsl(0, 98%, 68%)'
        });
    }

    handleSave(event:any){
        let ok1=true,ok2=true,ok3=true;
        if(this.state.donor.firstname=='' || this.state.donor.lastname=='' || this.state.donor.email=='' || this.state.donor.CNP=='' || this.state.donor.city=='' || this.state.donor.county=='' || this.state.donor.street=='' || this.state.donor.number==null)
        {    
            Alert.error("Completați toate câmpurile!", {
                position: 'top-right',
                effect: 'jelly'
            });
            ok1=false;
        }
        if(this.state.donor.password=='' || this.state.donor.confirmPassword=='' || this.state.newPassword==''){
            // Alert.error("Câmpurile de parolă necompletate!", {
            //     position: 'top-right',
            //     effect: 'jelly'
            // });
            ok2=false;
        }
        if(this.state.newPassword!=this.state.donor.confirmPassword && this.state.newPassword!='' && this.state.donor.confirmPassword!=''){
            Alert.error("Parolă nouă incompatibilă", {
                position: 'top-right',
                effect: 'jelly'
            });
            ok3=false;
        }
        if(ok1==true){
            let donorUpdate={
                email:this.state.donor.email,
                firstname:this.state.donor.firstname,
                lastname:this.state.donor.lastname,
                CNP:this.state.donor.CNP,
                city:this.state.donor.city,
                county:this.state.donor.county,
                street:this.state.donor.street,
                number:this.state.donor.number
            }
            DonorProfileService.updateInfo(donorUpdate);
            this.setState({
                isLoading: true,
                //bgColor: 'gray'
            });
            Alert.success("Schimbările au fost salvate", {
                position: 'top-right',
                effect: 'jelly'
            });
        }
        if(ok2==true && ok3==true){
             let passwordUpdate: IPasswordUpdate = {
                oldPassword:this.state.donor.password,
                newPassword:this.state.newPassword,
                confirmPassword:this.state.donor.confirmPassword
            }
            DonorProfileService.updatePassword(passwordUpdate).then((response:any) => {
                Alert.error("Parolă invalidă!\nParola trebuie să aibă minim 6 caractere(literă mare,mică,cifre și un caracter special)", {
                    position: 'top-right',
                    effect: 'jelly'
                });
            });
            this.setState({
                isLoading: true,
               // bgColor: 'gray'
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
            //bgColor: 'gray',
            newPassword:'',
            donor: update(this.state.donor,{password:{$set:''},confirmPassword:{$set:''}})
        });
        DonorProfileService.getDonor().then((donor:IDonorGet) => {
            this.setState({
                donor: donor
            });    
        });
    }

    togglePasswordChange = () => {
        if (this.state.isPasswordChanging) {
            this.setState({
                isPasswordChanging: false
            });
        } else {
            this.setState({
                isPasswordChanging: true
            });
        }
    }

    render(){
        const {isLoading}=this.state;
        return(
            <div className="main">
                
                <h1 className="title">Profil</h1>
                
                <div className="main">
                
                <Avatar className="avatar" src="data:image/jpeg;base64,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" size={200} />
                <HBox className="hBox">
                    <VBox className="content-vbox">

                    <VBox className="info-vbox">
                        <div>
                            <h1 className="mainTitles">Info</h1>
                        </div>
                        
                        <VBox>
                        <HBox>
                        <TextField text="Nume" type="text" value={this.state.donor.lastname} onChangeFunction={(event) => this.handleLastNameChange(event)} />
                        <TextField text="Prenume" type="text" value={this.state.donor.firstname} onChangeFunction={(event)=>this.handleFirstNameChange(event)} />
                        
                        </HBox>
                        <TextField text="Email" type="text" value={this.state.donor.email} onChangeFunction={(event)=>this.handleEmailChange(event)} />
                        <TextField text="CNP" type="text" value={this.state.donor.CNP} onChangeFunction={(event)=>this.handleCNPChange(event)}/>
                        

                        </VBox>

                        <TextField text="Oraș" type="text" value={this.state.donor.city} onChangeFunction={(event)=>this.handleCityChange(event)} />
                        <TextField text="Județ" type="text" value={this.state.donor.county} onChangeFunction={(event)=>this.handleCountyChange(event)} />
                        <TextField text="Stradă" type="text" value={this.state.donor.street} onChangeFunction={(event)=>this.handleStreetChange(event)} />
                        <TextField text="Număr" type="text" value={this.state.donor.number.toString(10)} onChangeFunction={(event)=>this.handleNumberChange(event)} />
                        <div>
                            <button onClick={this.togglePasswordChange} className="generic-button change-pass-btn">Schimbă parola</button>
                        </div>
                    </VBox>
                    <VBox className={this.state.isPasswordChanging? "pass-vbox pass-visible": "pass-vbox pass-hidden"}>
                        
                        
                        <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <PasswordField value={this.state.donor.password}className="passField" onChange={(event) => this.handleCPassChange(event)} hintText="Cel puțin 8 caractere" floatingLabelText="Introdu parola curentă" />
                        <PasswordField value={this.state.newPassword} onChange={(event) => this.handleNewPassChange(event)} hintText="Cel puțin 8 caractere" floatingLabelText="Introdu noua parolă" />
                        <PasswordField value={this.state.donor.confirmPassword} onChange={(event) => this.handleConfirmPassChange(event)} floatingLabelText="Confirmă noua parolă" />
                        </MuiThemeProvider>
                        
                        <HBox>
                            <ReactBootstrap.Button 
                                disabled={isLoading} 
                                className={this.state.isLoading? "generic-button password-btn btn-disabled" : "generic-button password-btn btn-enabled"} 
                                onClick={(event)=>this.handleSave(event)}>Salvează</ReactBootstrap.Button>
                            <ReactBootstrap.Button 
                                disabled={isLoading} 
                                className={this.state.isLoading? "generic-button password-btn btn-disabled" : "generic-button password-btn btn-enabled"} 
                                onClick={(event)=>this.handleCancel(event)}>Anulează</ReactBootstrap.Button>
                        </HBox>
                    </VBox>
                    </VBox>

                   
                </HBox>
                </div>
                <Alert stack={true} timeout={3000}/>
            </div>    
        );
    }
}