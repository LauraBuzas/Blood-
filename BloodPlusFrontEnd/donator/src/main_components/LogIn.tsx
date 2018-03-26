import * as React from 'react';
import { VBox, HBox } from 'react-stylesheet';
import { TextField } from '../utils/TextField';
import update from 'react-addons-update';
import '../css/Button.css';
import { IUserRegister } from './../Models/IUserRegister';
import { AccountService } from '../services/AccountServices';

export interface LoginProps {
    isLoggedInFunct: any
}

interface LoginState {
    userRegistered: IUserRegister
    message: string
    token: string
}

export class LogIn extends React.Component<LoginProps, LoginState>
{
    constructor(props: LoginProps) {
        super(props);

        this.state =
            {
                token: '',
                message: '',
                userRegistered:
                    {
                        username: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        password: ''
                    }
            }
    }

     handleUsernameChange(event:any)
    {
        this.setState({
            userRegistered:update(this.state.userRegistered,{username:{$set:event.target.value}})
        });
    }
   
    handlePasswordChange(event:any)
    {
        this.setState({
            userRegistered:update(this.state.userRegistered,{password:{$set:event.target.value}})
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
        },
            (error) => {

                this.setState({
                    message: "Error logging in,please try again"
                });
            });
    }

    render() {
        return (
            <div>
                <VBox padding="150px 350px">
                    <TextField text="Username" type="text" onChangeFunction={(event) => this.handleUsernameChange(event)}/>
                    <TextField text="Password" type="password" onChangeFunction={(event) => this.handlePasswordChange(event)} />
                    <button className="buttonLogIn" onClick={(event) => this.loginUser(event)}>Log in</button>
                </VBox>
            </div>
        );
    }
}