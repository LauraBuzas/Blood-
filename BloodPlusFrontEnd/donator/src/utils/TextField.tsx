import * as React from 'react';

export interface TextFieldProps {
    text: string,
    type: string,
    onChangeFunction: any,
    value?:string
}

interface TextFieldState { }

export class TextField extends React.Component<TextFieldProps, TextFieldState>
{
    render() {
        return (
            <div>
                <span className="input input--hoshi">
                    <input className="input__field input__field--hoshi" value={this.props.value} type={this.props.type} onChange={(event) => { this.props.onChangeFunction(event) }} />
                    <label className="input__label input__label--hoshi input__label--hoshi-color-3" >
                        <span className="input__label-content input__label-content--hoshi">{this.props.text}</span>
                    </label>
                </span>
            </div>
        )
    }

}