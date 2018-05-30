import * as React from 'react';


import { VBox, HBox } from 'react-stylesheet';
import { TextField } from '../utils/TextField'
import { IUserRegister } from '../Models/IUserRegister';
import { AccountService } from '../Services/AccountServices';
import { ConsoleLogger } from '@aspnet/signalr';
import EmailValidator from 'email-validator';
import { Redirect } from 'react-router';
import update from 'react-addons-update';
import Alert from 'react-s-alert';
import '../css/SignUp.css';
import '../css/Button.css';

export interface SignUpProps 
{
    setRole: any;
}
interface SignUpState {
    newUser: IUserRegister
    created: boolean
}
export class SignUp extends React.Component<SignUpProps, SignUpState> 
{
    constructor(props: SignUpProps) {
        super(props);

        this.state =
            {
                newUser:
                    {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        city : '',
                        confirmPassword: '',
                        county : '',
                        street : '',
                        number : -1,
                        cnp : ''
                    },
                created: false
            }
    }

    handleEmailChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { email: { $set: event.target.value } })
        });
    }

    handleFirstNameChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { firstName: { $set: event.target.value } })
        });
        console.log(this);
    }
    
    handleLastNameChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { lastName: { $set: event.target.value } })
        });
    }

    handleCnpChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { cnp: { $set: event.target.value } })
        });
    }

    handleCityChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { city: { $set: event.target.value } })
        });
    }

    handleCountyChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { county: { $set: event.target.value } })
        });
    }
 
    handleStreetChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { street: { $set: event.target.value } })
        });
    }

    handleNumberChange(event: any) {
        if(isNaN(event.target.value)){
            this.showError("Va rugam introduceti doar numere!")
        } else {
            this.setState({
                newUser: update(this.state.newUser, { number: { $set: event.target.value } })
            });
        }
    }

    handlePasswordChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { password: { $set: event.target.value } })
        });
    }

    handleConfirmPasswordChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { confirmPassword: { $set: event.target.value } } )
        });
    }

    registerUser(event: any) {
        event.preventDefault();
        if(
            this.state.newUser.lastName === '' ||
            this.state.newUser.firstName === '' ||
            this.state.newUser.county === '' ||
            this.state.newUser.city === '' ||
            this.state.newUser.cnp ==='' ||
            this.state.newUser.email === '' ||
            this.state.newUser.password === '' ||
            this.state.newUser.street === '' ||
            this.state.newUser.number === -1           
        ){
            
            this.showError('Toate campurile sunt obligatorii!');
        } else if(this.state.newUser.confirmPassword === this.state.newUser.password){
            if(isNaN(this.state.newUser.number)) {
                this.showError('Va rugam introduceti doar numere!');
                return;
            }
            if(!(/^\d+$/.test(this.state.newUser.cnp))) {
                this.showError('Campul CNP trebuie sa contina doar numere!');
                return;
            }
            if(this.state.newUser.cnp.length < 10) {
                this.showError('CNP-ul trebuie sa aiba cel putin 10 cifre');
                return;
            }
            if(this.state.newUser.password.length < 6){
                this.showError('Parola trebuie sa aiba minim 6 caractere');
                return;
            }
            //needs stronger validation for password, or at least an info field
            //rework thislater if there is time
            if(EmailValidator.validate(this.state.newUser.email)){
                console.log('signing up', this.state.newUser);
                AccountService.registerUser(this.state.newUser).then((resp) => {
                    this.setState({
                        created: update(this.state.created, { $set: true } )
                    });
                });
            } else {
                this.showError('Email-ul nu este valid!');
            }
        } else {
            this.showError('Parolele nu coincid!');
        } 
    }

    showError(errorMessage: string) {
        Alert.error(errorMessage, {
            position: 'top-right',
            effect: 'jelly'
        });
    }

    render() {
        if(this.state.created === true) {
            return <Redirect to='/'/>
        }
        return (
            <VBox id="signup-container">
            
            {/* first and last names */}
            <HBox>
                <TextField text="Nume" 
                    type="text" 
                    onChangeFunction={this.handleFirstNameChange.bind(this)} />
                <TextField text="Prenume" 
                    type="text" 
                    onChangeFunction={this.handleLastNameChange.bind(this)} />
            </HBox>
            {/* cnp */}            
            <TextField text="CNP" 
                type="text" 
                onChangeFunction={this.handleCnpChange.bind(this)} />        
            {/* city and county */}
            <HBox>
                <TextField text="Oraș" 
                    type="text" 
                    onChangeFunction={this.handleCityChange.bind(this)} />
                <TextField text="Județ" 
                    type="text" 
                    onChangeFunction={this.handleCountyChange.bind(this)} />
            </HBox>
            {/* street */}
            <HBox>
                <TextField text="Strada" 
                    type="text" 
                    onChangeFunction={this.handleStreetChange.bind(this)} />
                <TextField text="Număr" 
                    type="text" 
                    onChangeFunction={this.handleNumberChange.bind(this)} />
            </HBox>
            
            
            <TextField text="E-mail" 
                
                type="text" 
                onChangeFunction={this.handleEmailChange.bind(this)} />
            {/* <TextField text="Nume utilizator" type="text" onChangeFunction={this.ha.bind(this)} /> */}
        
            <HBox>
                <TextField text="Parolă" 
                    type="password" 
                    onChangeFunction={this.handlePasswordChange.bind(this)} />
                <TextField text="Confirmare Parolă" 
                    type="password" 
                    onChangeFunction={this.handleConfirmPasswordChange.bind(this)} />
            </HBox>
            <button className="generic-button">Inregistrează-te</button>
        
            </VBox>      
            
        );
    }
}
