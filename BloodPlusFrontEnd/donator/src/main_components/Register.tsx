import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { IUserRegister } from '../Models/IUserRegister';
import { AccountService } from '../Services/AccountServices';
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
                        password: '',
                        city:'',
                        county:'',
                        number:-1,
                        street:''
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