import * as React from 'react';
import { VBox, HBox } from 'react-stylesheet';
import { TextField } from '../utils/TextField'
import '../css/Button.css';
import '../css/SignUp.css';

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        console.log('Sign up props: ', props);

    }

    handleUsernameChange() { }

    render() {
        return (
            <div>
                <HBox className="hboxPosition">
                    <VBox className="vboxPosition">
                        <HBox className="hboxTwoEntities">
                            <TextField text="Nume" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                            <TextField text="Prenume" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                            <TextField text="Oras" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                            <TextField text="Judet" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                            <TextField text="Strada" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                            <TextField text="Numar" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />

                        </HBox>
                        <TextField text="E-mail" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                        <TextField text="Nume utilizator" type="text" onChangeFunction={this.handleUsernameChange.bind(this)} />
                        <TextField text="Parolă" type="password" onChangeFunction={this.handleUsernameChange.bind(this)} />
                        <TextField text="Confirmare Parolă" type="password" onChangeFunction={this.handleUsernameChange.bind(this)} />
                        <button className="buttonSignUp">Sign up</button>
                    </VBox>
                </HBox>
            </div>
        );
    }
}
