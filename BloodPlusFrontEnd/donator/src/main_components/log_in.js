import * as React from 'react';
import {VBox, HBox} from 'react-stylesheet';
import { TextField } from '../utils/TextField';
import '../css/Button.css';

export class LogIn extends React.Component
{
    constructor (props){
        super(props);
        console.log('Log in props: ', props);
        
    }

    render(){
        return(
            <div>
                <VBox>
                    <TextField text="Username" type="text" id="idx_user_name"/>
                    <TextField text="Password" type="password" id="idx_password"/>
                    <button class="buttonLogIn">Log in</button>
                </VBox>
            </div>
        );
    }
}