import React from "react";
import ReactDOM from "react-dom";
import HeaderForm from './HeaderForm';

import './FormStyle.css';


export interface SuccesProps{
  
   textFromParent:string
    
}

interface SuccesState{
    message:string;
}

export default class Succes extends React.Component<SuccesProps,SuccesState>{

    constructor(props){
        super(props);
        this.state={message:this.props.textFromParent}
    }
    render(){
        return(
            <div>


                <div className='step'>
             
           
                <h2 className='stepName'> Verificare efectuata</h2>
        
            <label>{this.props.textFromParent} </label><br/><br/>
            </div>
            </div>
        );
    }

}