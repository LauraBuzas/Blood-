import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { IUserRegister } from '../Models/IUserRegister';
import { AccountService } from '../Services/AccountServices';
import { LogIn } from './LogIn';

export interface RegisterProps 
{
    setRole:any;
}


interface RegisterState {
    userRegistered: IUserRegister
    message: string
    
   
}

export class Register extends React.Component<RegisterProps, RegisterState>
{
    constructor(props: RegisterProps) {
        super(props);

        this.state =
            {
                message: '',
                userRegistered:
                    {
                        
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

    render() {
        return (
            <LogIn setRole={this.props.setRole}   />
        );
    }
}