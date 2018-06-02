import React from "react";
import ReactDOM from "react-dom";
import HeaderForm from './HeaderForm'
import StepTwo from './StepTwo';
import {IDonorRegistrationData} from '../Models/IDonorRegistrationData'
import './FormStyle.css'
import {DonorService} from '../Services/DonorService'
export interface StepOneProps{
  
    handleToParent:Function
    listfromParent:any
    listValidFromParent:any
    listMessageFromParent:any
    donor:IDonorRegistrationData
    
}

interface StepOneState{

    
    name:string;
    
    surname:string;
    date_of_birth:Date;
    domicile_city:string;
    domicile_county:string;
    residence_city:string;
    residence_county:string;
    cnp:string;
    listMessages:any
    listMessagesClasses:any
  


}


export default class StepOne extends React.Component<StepOneProps,StepOneState>{

    constructor(props){
        
        super(props);
        console.log("nume: "+this.props.listfromParent[0]);
        this.state=//{name:this.props.listfromParent[0],surname:this.props.listfromParent[1],date_of_birth:this.props.listfromParent[2],domicile_city:this.props.listfromParent[3],domicile_county:this.props.listfromParent[4],residence_city:this.props.listfromParent[5],residence_county:this.props.listfromParent[6],cnp:this.props.listfromParent[7],
        {name:this.props.donor.name,surname:this.props.donor.surname,date_of_birth:this.props.donor.dob,domicile_city:this.props.donor.cityD,domicile_county:this.props.donor.countyD,residence_city:this.props.listfromParent[5],residence_county:this.props.listfromParent[6],cnp:this.props.donor.cnp,
           listMessages:['Nume invalid','Prenume invalid','Data nasterii invalida','Localitatea de domiciliu e invalida','Judetul de domiciliu e invalid','Localitatea de resedinta e invalida','Judetul de resedinta e invalid','CNP-ul e invalid'],
           listMessagesClasses:this.props.listMessageFromParent//['invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel']
        }
        
        this.handleName=this.handleName.bind(this);
        this.handleSurname=this.handleSurname.bind(this);
        this.handleDOB=this.handleDOB.bind(this);
        this.handleDCity=this.handleDCity.bind(this);
        this.handleDCounty=this.handleDCounty.bind(this);
        this.handleRCity=this.handleRCity.bind(this);
        this.handleRCounty=this.handleRCounty.bind(this);
        this.handleCNP=this.handleCNP.bind(this);
        
    }
    componentDidMount(){
        DonorService.getDonorData().then((donor:IDonorRegistrationData) => {
            this.setState({
                name:donor.name,surname:donor.surname,date_of_birth:donor.dob,domicile_city:donor.cityD,domicile_county:donor.countyD,residence_city:this.props.listfromParent[5],residence_county:this.props.listfromParent[6],cnp:donor.cnp
               
            });    
        });

    }
    handleCNP(event){
        this.setState({cnp:event.target.value});
        if(event.target.value.length!=0){
            this.props.listValidFromParent[7]='validField';
            this.state.listMessagesClasses[7]='invisibleLabel'
        }
        else{
         this.props.listValidFromParent[7]='invalidField';
         this.state.listMessagesClasses[7]='visibleLabel'
        }
        this.props.listfromParent[7]=event.target.value;
         //var list=[this.state.name,this.state.surname,this.state.date_of_birth,this.state.domicile_city,this.state.domicile_county,this.state.residence_city,this.state.residence_county]
         this.props.handleToParent(this.props.listfromParent);//(list);
    }
   
    handleName(event){
        this.setState({name:event.target.value});
       if(event.target.value.length!=0){
           this.props.listValidFromParent[0]='validField';
           this.state.listMessagesClasses[0]='invisibleLabel'
       }
       else{
        this.props.listValidFromParent[0]='invalidField';
        this.state.listMessagesClasses[0]='visibleLabel'
       }
       this.props.listfromParent[0]=event.target.value;
        //var list=[this.state.name,this.state.surname,this.state.date_of_birth,this.state.domicile_city,this.state.domicile_county,this.state.residence_city,this.state.residence_county]
        this.props.handleToParent(this.props.listfromParent);//(list);
        
    }
    handleSurname(event){
        this.setState({surname:event.target.value});
        if(event.target.value.length!=0){
            this.props.listValidFromParent[1]='validField';
            this.state.listMessagesClasses[1]='invisibleLabel'
        }
        else{
         this.props.listValidFromParent[1]='invalidField';
         this.state.listMessagesClasses[1]='visibleLabel'
        }
        
        this.props.listfromParent[1]=event.target.value;
       // var list=[this.state.name,this.state.surname,this.state.date_of_birth,this.state.domicile_city,this.state.domicile_county,this.state.residence_city,this.state.residence_county]
        this.props.handleToParent(this.props.listfromParent);//(list);
    }

    handleDOB(event){
        this.setState({date_of_birth:event.target.value});
        this.props.listfromParent[2]=event.target.value;
       // var list=[this.state.name,this.state.surname,this.state.date_of_birth,this.state.domicile_city,this.state.domicile_county,this.state.residence_city,this.state.residence_county]
        this.props.handleToParent(this.props.listfromParent);//(list);
    }
    handleDCity(event){
        this.setState({domicile_city:event.target.value});
        if(event.target.value.length!=0){
            this.props.listValidFromParent[3]='validField';
            this.state.listMessagesClasses[3]='invisibleLabel'
        }
        else{
         this.props.listValidFromParent[3]='invalidField';
         this.state.listMessagesClasses[3]='visibleLabel'
        }
        this.props.listfromParent[3]=event.target.value;
       // var list=[this.state.name,this.state.surname,this.state.date_of_birth,this.state.domicile_city,this.state.domicile_county,this.state.residence_city,this.state.residence_county]
        this.props.handleToParent(this.props.listfromParent);//(list);
    }
    handleDCounty(event){

        this.setState({domicile_county:event.target.value});
        if(event.target.value.length!=0){
            this.props.listValidFromParent[4]='validField';
            this.state.listMessagesClasses[4]='invisibleLabel'
        }
        else{
         this.props.listValidFromParent[4]='invalidField';
         this.state.listMessagesClasses[4]='visibleLabel'
        }
        this.props.listfromParent[4]=event.target.value;
        //var list=[this.state.name,this.state.surname,this.state.date_of_birth,this.state.domicile_city,this.state.domicile_county,this.state.residence_city,this.state.residence_county]
        this.props.handleToParent(this.props.listfromParent);//(list);
    }
    handleRCity(event){
        this.setState({residence_city:event.target.value})
        if(event.target.value.length!=0){
            this.props.listValidFromParent[5]='validField';
            this.state.listMessagesClasses[5]='invisibleLabel'
        }
        else{
         this.props.listValidFromParent[5]='invalidField';
         this.state.listMessagesClasses[5]='visibleLabel'
        }
        this.props.listfromParent[5]=event.target.value;

        //var list=[this.state.name,this.state.surname,this.state.date_of_birth,this.state.domicile_city,this.state.domicile_county,this.state.residence_city,this.state.residence_county]
        this.props.handleToParent(this.props.listfromParent);
    }
    handleRCounty(event){
        this.setState({residence_county:event.target.value});
        if(event.target.value.length!=0){
            this.props.listValidFromParent[6]='validField';
            this.state.listMessagesClasses[6]='invisibleLabel'
        }
        else{
         this.props.listValidFromParent[6]='invalidField';
         this.state.listMessagesClasses[6]='visibleLabel'
        }
        this.props.listfromParent[6]=event.target.value;
        var list=[this.state.name,this.state.surname,this.state.date_of_birth,this.state.domicile_city,this.state.domicile_county,this.state.residence_city,this.state.residence_county]
        this.props.handleToParent(this.props.listfromParent);//(list);
    }

    render(){
        return(
            <div>
                
            <div className='step'>
                
               
            
            <h2 className='stepName'> Date Personale</h2>
               
            <label>Nume </label>
            <input type='text' value={this.state.name} onChange={this.handleName} name="name" className={this.props.listValidFromParent[0]} />
            
            <br/><label className={this.state.listMessagesClasses[0]}>{this.state.listMessages[0]}</label>
            <br /><br/>
               
            <label>Prenume</label>
            <input type='text' value={this.state.surname} onChange={this.handleSurname} name="surname" className={this.props.listValidFromParent[1]}/>
              
            <br/><label className={this.state.listMessagesClasses[1]}>{this.state.listMessages[1]}</label>
            <br/><br/>
            <label>CNP</label>
            <input type='text' value={this.state.cnp} onChange={this.handleCNP} name="cnp" className={this.props.listValidFromParent[7]}/>
            <br/><label className={this.state.listMessagesClasses[7]}>{this.state.listMessages[7]}</label>
            <br/><br/>
            <label>Data nasterii </label>
            <input type='date' onChange={this.handleDOB} name="dob" value={this.props.listfromParent[2]} className={this.props.listValidFromParent[2]} />
            <br/>
            <label className={this.state.listMessagesClasses[2]}>{this.state.listMessages[2]}</label>
            <br/><br/>
            <label className='subtitle'>Domiciliu</label>
           
            <br/><br/>
            <label>Localitate </label>
            <input  type='text' onChange={this.handleDCity} name="dcity" value={this.state.domicile_city} className={this.props.listValidFromParent[3]}/>
           
            <label>   Judet   </label>
            <input  type='text' onChange={this.handleDCounty} name="dcounty" value={this.state.domicile_county} className={this.props.listValidFromParent[4]}/>
            <br/>
            <label className={this.state.listMessagesClasses[3]}>{this.state.listMessages[3]}</label>
            
            <label className={this.state.listMessagesClasses[4]}>{this.state.listMessages[4]}</label>
            <br/><br/>
            <label className='subtitle'>Resedinta</label>
            <br/><br/>
            <label>Localitate </label>
            <input  type='text' onChange={this.handleRCity} name="rcity" value={this.state.residence_city} className={this.props.listValidFromParent[5]}/>
            
            <label>   Judet   </label>
            <input  type='text' onChange={this.handleRCounty} name="rcounty" value={this.state.residence_county} className={this.props.listValidFromParent[6]}/>
            <br/>
            <label className={this.state.listMessagesClasses[5]}>{this.state.listMessages[5]}</label>
            <label className={this.state.listMessagesClasses[6]}>{this.state.listMessages[6]}</label>
            
            <br/><br/>
            

            
            <br/>
            
            

            

</div>
            
            </div>

           
    )
    }
}

