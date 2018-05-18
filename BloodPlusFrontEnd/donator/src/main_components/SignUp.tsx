import * as React from 'react';
import { VBox, HBox } from 'react-stylesheet';
import { TextField } from '../utils/TextField'
import '../css/Button.css';
import '../css/SignUp.css';
import update from 'react-addons-update';
import Alert from 'react-s-alert';
import { IUserRegister } from '../Models/IUserRegister';
import { AccountService } from '../Services/AccountServices';
import { ConsoleLogger } from '@aspnet/signalr';
export interface SignUpProps 
{
    setRole: any;
}
interface SignUpState {
    newUser: IUserRegister
    confirmPassword: string
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
                        county : '',
                        street : '',
                        number : -1,
                        cnp : ''
                    },
                confirmPassword: ''
            }
    }

    handleEmailChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { email: { $set: event.target.value } })
        });
    }

    handleFirstNameChange(event: any) {
        console.log(event);
        console.log(event.target.value);
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
        this.setState({
            newUser: update(this.state.newUser, { number: { $set: event.target.value } })
        });
    }

    handlePasswordChange(event: any) {
        this.setState({
            newUser: update(this.state.newUser, { password: { $set: event.target.value } })
        });
    }

    handleConfirmPasswordChange(event: any) {
        this.setState({
            confirmPassword: update(this.state.confirmPassword,  { $set: event.target.value } )
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
        } else if(this.state.confirmPassword === this.state.newUser.password){
            let newUser = {
                email: this.state.newUser.email,
                password: this.state.newUser.password,
                cnp: this.state.newUser.cnp,
                city: this.state.newUser.city,
                country: this.state.newUser.county,
                firstName: this.state.newUser.firstName,
                lastName: this.state.newUser.lastName
            }
            AccountService.registerUser(newUser).then((resp) => {
            alert(resp);
                
            });
        } else {
            alert(this.state.confirmPassword);
            alert(this.state.newUser.password);
            alert(this.state.confirmPassword === this.state.newUser.password);
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
        return (
            <div>
                <HBox className="hboxPosition">
                    <VBox className="vboxPosition">
                        <HBox className="hboxTwoEntities">
                            <TextField text="Nume" type="text" onChangeFunction={(event) => this.handleFirstNameChange(event)} />
                            <TextField text="Prenume" type="text" onChangeFunction={ (event) => this.handleLastNameChange(event)} />
                        </HBox>
                        <TextField text="CNP" type="text" onChangeFunction={(event) => this.handleCnpChange(event)} />

                        <HBox className="hboxTwoEntities">
                        <TextField text="Oras" type="text" onChangeFunction={(event) => this.handleCityChange(event)} />
                        <TextField text="Judet" type="text" onChangeFunction={(event) => this.handleCountyChange(event)} />
                        </HBox>

                        <HBox className="hboxTwoEntities">
                        <TextField text="Strada" type="text" onChangeFunction={(event) => this.handleStreetChange(event)} />
                        <TextField text="Numar" type="text" onChangeFunction={(event) => this.handleNumberChange(event)} />
                        </HBox>

                        <TextField text="E-mail" type="text" onChangeFunction={(event) => this.handleEmailChange(event)} />
                        <TextField text="Parola" type="password" onChangeFunction={(event) => this.handlePasswordChange(event)} />
                        <TextField text="Confirmare parola" type="password" onChangeFunction={(event) => this.handleConfirmPasswordChange(event)} />
                        <button className="buttonSignUp"  onClick={(event) => this.registerUser(event)}>Inregistreaza-te</button>
                    </VBox>
                </HBox>
                <Alert stack={true} timeout={3000} />
            </div>
        );
    }
}
