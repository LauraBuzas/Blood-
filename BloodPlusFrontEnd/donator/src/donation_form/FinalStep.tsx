import React from "react";
import ReactDOM from "react-dom";
import HeaderForm from './HeaderForm'
import {DonorService} from '../Services/DonorService'
import './FormStyle.css'
import {IDonorContact} from '../Models/IDonorContact'
export interface FinalStepProps{
handleToParent:Function;
listfromParent:any
listValidFromParent:any
listMessageFromParent:any


}

interface FinalStepState{

   
    email:string;
    phone:string;
    donation_to_name:string;
    donation_to_surname:string;
    listMessageClasses:any;
    listMessage:any
}


export default class FinalStep extends React.Component<FinalStepProps,FinalStepState>{
constructor(props){
    super(props);
    this.state={email:this.props.listfromParent[0],phone:this.props.listfromParent[1],donation_to_name:this.props.listfromParent[2],donation_to_surname:this.props.listfromParent[3],
        listMessageClasses:this.props.listMessageFromParent,
        listMessage:['E-mail invalid','Numar de telefon invalid']
    
    };
    this.handleEmail=this.handleEmail.bind(this);
    this.handlePhone=this.handlePhone.bind(this);
    this.handleDonationToName=this.handleDonationToName.bind(this);
    this.handleDonationToSurname=this.handleDonationToSurname.bind(this);

}

componentDidMount(){
    DonorService.getDonorContact().then((contact:IDonorContact) => {
        if(this.state.email.length==0)
        {this.setState({
           email:contact.email,phone:contact.phone
           
        });}
        this.props.listfromParent[0]=contact.email;
        this.props.listfromParent[1]=contact.phone;    
    });
}
handleEmail(event){
    this.setState({email:event.target.value});
    if(event.target.value.length!=0){
        this.props.listValidFromParent[0]='validField';
        this.state.listMessageClasses[0]='invisibleLabel'
    }
    else{
     this.props.listValidFromParent[0]='invalidField';
     this.state.listMessageClasses[0]='visibleLabel'
    }
    this.props.listfromParent[0]=event.target.value;
   // var list=[this.state.email,this.state.phone,this.state.donation_to_name,this.state.donation_to_surname];
    
    this.props.handleToParent(this.props.listfromParent);//(list);
}
handlePhone(event){
    this.setState({phone:event.target.value});
    if(event.target.value.length!=0){
        this.props.listValidFromParent[1]='validField';
        this.state.listMessageClasses[1]='invisibleLabel'
    }
    else{
     this.props.listValidFromParent[1]='invalidField';
     this.state.listMessageClasses[1]='visibleLabel'
    }
    this.props.listfromParent[1]=event.target.value;
   // var list=[this.state.email,this.state.phone,this.state.donation_to_name,this.state.donation_to_surname];
    
    this.props.handleToParent(this.props.listfromParent);//(list);
}
handleDonationToName(event){
    this.setState({donation_to_name:event.target.value});
    //var list=[this.state.email,this.state.phone,this.state.donation_to_name,this.state.donation_to_surname];
    this.props.listfromParent[2]=event.target.value;
    this.props.handleToParent(this.props.listfromParent);//(list);
}
handleDonationToSurname(event){
    this.setState({donation_to_surname:event.target.value});
    //var list=[this.state.email,this.state.phone,this.state.donation_to_name,this.state.donation_to_surname];
    this.props.listfromParent[3]=event.target.value;
    this.props.handleToParent(this.props.listfromParent);//(list);
}

    render(){
        return(
            <div>
                
                
            <div className='step'>
            <h2 className='step-name'>Finalizare</h2>
            <div className="step4-fields">
            <label className='subtitle'>Informații de contact</label>
            
            <div>
            <label>E-mail </label>
            <input type="text" onChange={this.handleEmail} value={this.state.email} className={this.props.listValidFromParent[0]} />
            
            <label className={this.state.listMessageClasses[0]}>{this.state.listMessage[0]}</label>
            
            </div>
            
            <div>
            <label>Telefon</label>
            <input type="text"   onChange={this.handlePhone} value={this.state.phone} className={this.props.listValidFromParent[1]} />
            
            <label className={this.state.listMessageClasses[1]}>{this.state.listMessage[1]}</label>
            
            </div>
            
            <div>
            <label className='subtitle'>Persoana pentru care se donează sânge</label>
            <label className='optionalText'>(Opțional)</label>
            
            <div>
            <label>Nume</label>
            <input type='text'  name="name" onChange={this.handleDonationToName}/>
            
            </div>
           
            <div>
            <label>Prenume</label>
            <input type='text'  name="surname" onChange={this.handleDonationToSurname}/>
      
            </div>
            
            </div>

            
            </div>
            
            </div>

            </div>
    )
    }
}

