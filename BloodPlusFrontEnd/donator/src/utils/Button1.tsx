import React, { Component } from 'react';
import Button from 'react-button-component';


export interface Button1Props {
    text: string,
    onClickFunction:any
    
}

interface Button1State { }

export class Button1 extends React.Component<Button1Props, Button1State>
{
    render() {
        return (
            <div>
                <Button  onClick={(event)=>this.props.onClickFunction(event)}>
                {this.props.text}
                </Button>
            </div>
        )
    }

}