import * as React from 'react';
import { VBox, HBox } from 'react-stylesheet';
import { TextField } from '../utils/TextField'
import '../css/Button.css';
import '../css/Login.css';

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        console.log('Sign up props: ', props);

    }

    handleUsernameChange() { }

    render() {
        return (
            <div>
                <VBox className='vboxLogin'>
                    <HBox>
                        <TextField text="First Name" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                        <TextField text="Last Name" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                    </HBox>
                    <TextField text="E-mail" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                    <TextField text="Username" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                    <TextField text="Password" type="password" onChangeFunction={this.handleUsernameChange.bind(this)} />
                    <TextField text="Confirm Password" type="password" onChangeFunction={this.handleUsernameChange.bind(this)} />
                    <button className="buttonSignUp">Sign up</button>
                </VBox>
            </div>
        );
    }
}
