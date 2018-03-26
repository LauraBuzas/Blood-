import * as React from 'react';
import '../css/TextField.css';

export class TextField extends React.Component
{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            text: props.text,
            onChangeFunction: props.onChangeFunction,
            type: props.type,
            children: props.children,
        };
    }

    render()
    {
        return(
            <div>
                <span className="input input--hoshi">
                    <input className="input__field input__field--hoshi" type={this.props.type} onChange={(event) => { this.props.onChangeFunction(event) }} />
                    <label className="input__label input__label--hoshi input__label--hoshi-color-3" >
                        <span className="input__label-content input__label-content--hoshi">{this.props.text}</span>
                    </label>
                </span>
             </div>
        )
    }

}