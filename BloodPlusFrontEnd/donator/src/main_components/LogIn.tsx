import * as React from 'react';
import { VBox, HBox } from 'react-stylesheet';
import { TextField } from '../utils/TextField';
import update from 'react-addons-update';
import '../css/Button.css';
import { IUserRegister } from './../Models/IUserRegister';
import { AccountService } from '../Services/AccountServices';
import { Redirect } from 'react-router';
import Alert from 'react-s-alert';
//import '../css/Login.css';

export interface LoginProps {
    isLoggedInFunct: any
}

interface LoginState {
    userRegistered: IUserRegister
    message: string
    role:string
}

export class LogIn extends React.Component<LoginProps, LoginState>
{
    constructor(props: LoginProps) {
        super(props);

        this.state =
            {
                message: '',
                userRegistered:
                    {
                        username: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        password: ''
                    },
                role:''
            }
    }

    handleUsernameChange(event: any) {
        this.setState({
            userRegistered: update(this.state.userRegistered, { username: { $set: event.target.value } })
        });
    }

    handlePasswordChange(event: any) {
        this.setState({
            userRegistered: update(this.state.userRegistered, { password: { $set: event.target.value } })
        });
    }

    loginUser(event: any) {
        event.preventDefault();
        let user = {
            username: this.state.userRegistered.username,
            password: this.state.userRegistered.password
        }
        AccountService.loginUser(user).then((resp) => {
            console.log(resp);
            this.setState({role:resp.data[0]});
           

        },
            (error) => {

                this.setState({
                    message: "Error logging in,please try again"
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
            });
    }

    render() {
        
        if(this.state.role=="HospitalAdmin")
        {
            return <Redirect to="/hospital/admin"/>
        }

        if(this.state.role=="DonationCenterAdmin")
        {
            return <Redirect to="/center/admin"/>
        }
        
        return (
            <div>
                <HBox className="hboxPosition">
                    <VBox className="vboxPosition">
                        <TextField text="Nume utilizator" type="text" onChangeFunction={(event) => this.handleUsernameChange(event)} />
                        <TextField text="Parolă" type="password" onChangeFunction={(event) => this.handlePasswordChange(event)} />
                        <button className="buttonLogIn" onClick={(event) => this.loginUser(event)}>Log in</button>
                    </VBox>
                </HBox>
                <Alert stack={true} timeout={3000} />
            </div>
        );
    }
}