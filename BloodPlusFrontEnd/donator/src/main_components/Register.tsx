import * as React from 'react';
import './Register.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { IUserRegister } from '../Models/IUserRegister';
import { AccountService } from '../services/AccountServices';
import { LogIn } from './LogIn';

export interface RegisterProps { }

interface RegisterState {
    userRegistered: IUserRegister
    message: string
    isRegistered: boolean
}

export class Register extends React.Component<RegisterProps, RegisterState>
{
    constructor(props: RegisterProps) {
        super(props);

        this.state =
            {
                isRegistered: false,
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
    };

    loginUser(event: any) {
        event.preventDefault();
        let user = {
            username: this.state.userRegistered.username,
            password: this.state.userRegistered.password
        }
        AccountService.loginUser(user).then((resp) => console.log(resp.json()));
    }

    render() {
        return (
            <LogIn isLoggedInFunct={(event) => { this.loginUser(event) }} />
        );
    }
}