import React from "react";
import ReactDOM from "react-dom";
import HeaderForm from './HeaderForm';

import './FormStyle.css';



export interface StepTwoProps {
    handleToParent:Function
    listfromParent:any
    listValidFromParent:any
    listMessageFromParent:any
}

interface StepTwoState {
   femaleselection:string;
   
   
   age:number;
   weight:number;
   pulse:number;
   blood_pressure:number;
   surgery:string;
   gender:string;
   female_cond1:string;
   female_cond2:boolean;
   treatment1:boolean;
   treatment2:boolean;
   treatment3:boolean;
   treatment4:boolean;
   treatment5:boolean;
   treatment6:boolean;
   listMessage:any;
   listMessageClasses:any;
   checkedM:boolean;
   checkedF:boolean;

   

}

export default class StepTwo extends React.Component<StepTwoProps,StepTwoState>{

    constructor(props){
        super(props),
        this.isFSelected=this.isFSelected.bind(this);
        this.isMSelected=this.isMSelected.bind(this);
       // this.state={femaleselection:'onlyF',age:0,weight:0,pulse:0,blood_pressure:0,surgery:'',gender:'',female_cond1:'',
       // female_cond2:false,treatment1:false,treatment2:false,treatment3:false,treatment4:false,treatment5:false,treatment6:false
       this.state={femaleselection:'onlyF',age:this.props.listfromParent[0],weight:this.props.listfromParent[1],pulse:this.props.listfromParent[2],blood_pressure:this.props.listfromParent[3],surgery:this.props.listfromParent[4],gender:this.props.listfromParent[5],female_cond1:this.props.listfromParent[6],
       female_cond2:this.props.listfromParent[7],treatment1:this.props.listfromParent[8],treatment2:this.props.listfromParent[9],treatment3:this.props.listfromParent[10],treatment4:this.props.listfromParent[11],treatment5:this.props.listfromParent[12],treatment6:this.props.listfromParent[13],
       listMessageClasses:this.props.listMessageFromParent,
       listMessage:['Varsta invalida','Greutate invalida','Puls invalid','Tensiune invalida','Selectati un raspuns'],
       checkedM:this.props.listfromParent[14],checkedF:this.props.listfromParent[15]
   
    }
    this.handleAge=this.handleAge.bind(this);
    this.handleBloodPressure=this.handleBloodPressure.bind(this);
    this.handleFemaleCond1=this.handleFemaleCond1.bind(this);
    this.handleFemaleCond2=this.handleFemaleCond2.bind(this);
    this.handleGender=this.handleGender.bind(this);
    this.handlePulse=this.handlePulse.bind(this);
    this.handleSurgery=this.handleSurgery.bind(this);
    this.handleTreatment1=this.handleTreatment1.bind(this);
    this.handleTreatment2=this.handleTreatment2.bind(this);
    this.handleTreatment3=this.handleTreatment3.bind(this);
    this.handleTreatment4=this.handleTreatment4.bind(this);
    this.handleTreatment5=this.handleTreatment5.bind(this);
    this.handleTreatment6=this.handleTreatment6.bind(this);
    this.handleWeight=this.handleWeight.bind(this);
    this.isFSelected=this.isFSelected.bind(this);
    this.isMSelected=this.isMSelected.bind(this);

       
    }

    isFSelected(event){
        this.setState({femaleselection:'onlyFShow',gender:'F'});
        this.props.listfromParent[15]=true;
        this.props.listfromParent[14]=false;
        //this.handleGender(event);
        this.props.listfromParent[5]=event.target.value;
        
        
        this.props.handleToParent(this.props.listfromParent);

    }
    isMSelected(event){
        this.setState({femaleselection:'onlyF',gender:'M'});
        this.props.listfromParent[14]=true;
            this.props.listfromParent[15]=false;
        
        
        //this.handleGender(event);
        this.props.listfromParent[5]=event.target.value;
        
        
        this.props.handleToParent(this.props.listfromParent);
        
    }

  handleAge(event){
        this.setState({age:event.target.value});
        if(event.target.value>=18){
            this.props.listValidFromParent[0]='validField';
            this.state.listMessageClasses[0]='invisibleLabel'
        }
        else{
            this.props.listValidFromParent[0]='invalidField';
            this.state.listMessageClasses[0]='visibleLabel'
        }
        this.props.listfromParent[0]=event.target.value;
        var list=[this.state.age,this.state.weight,this.state.pulse,this.state.blood_pressure,this.state.surgery,this.state.gender,this.state.female_cond1,this.state.female_cond2,this.state.treatment1,this.state.treatment2,this.state.treatment3,this.state.treatment4,this.state.treatment5,this.state.treatment6]
        
        this.props.handleToParent(this.props.listfromParent);//(list);
    }
    handleWeight(event){
        this.setState({weight:event.target.value});
        if(event.target.value>0){
            this.props.listValidFromParent[1]='validField';
            this.state.listMessageClasses[1]='invisibleLabel'
        }
        else{
            this.props.listValidFromParent[1]='invalidField';
            this.state.listMessageClasses[1]='visibleLabel'
        }
        this.props.listfromParent[1]=event.target.value;
        //var list=[this.state.age,this.state.weight,this.state.pulse,this.state.blood_pressure,this.state.surgery,this.state.gender,this.state.female_cond1,this.state.female_cond2,this.state.treatment1,this.state.treatment2,this.state.treatment3,this.state.treatment4,this.state.treatment5,this.state.treatment6]
        
        this.props.handleToParent(this.props.listfromParent);//(list);
    }
    handlePulse(event){
        this.setState({pulse:event.target.value});
        if(event.target.value>0){
            this.props.listValidFromParent[2]='validField';
            this.state.listMessageClasses[2]='invisibleLabel'
        }
        else{
            this.props.listValidFromParent[2]='invalidField';
            this.state.listMessageClasses[2]='visibleLabel'
        }
        this.props.listfromParent[2]=event.target.value;
        //var list=[this.state.age,this.state.weight,this.state.pulse,this.state.blood_pressure,this.state.surgery,this.state.gender,this.state.female_cond1,this.state.female_cond2,this.state.treatment1,this.state.treatment2,this.state.treatment3,this.state.treatment4,this.state.treatment5,this.state.treatment6]
        
        this.props.handleToParent(this.props.listfromParent);//(list);
    }

    handleBloodPressure(event){
        this.setState({blood_pressure:event.target.value});
        if(event.target.value>0){
            this.props.listValidFromParent[3]='validField';
            this.state.listMessageClasses[3]='invisibleLabel'
        }
        else{
            this.props.listValidFromParent[3]='invalidField';
            this.state.listMessageClasses[3]='visibleLabel'
        }
        this.props.listfromParent[3]=event.target.value;
        //var list=[this.state.age,this.state.weight,this.state.pulse,this.state.blood_pressure,this.state.surgery,this.state.gender,this.state.female_cond1,this.state.female_cond2,this.state.treatment1,this.state.treatment2,this.state.treatment3,this.state.treatment4,this.state.treatment5,this.state.treatment6]
        
        this.props.handleToParent(this.props.listfromParent);//(list);
    }
    handleSurgery(event){
        this.setState({surgery:event.target.value});
        this.props.listfromParent[4]=event.target.value;
        console.log(event.target.value);
        if(event.target.value!=""){
            this.props.listValidFromParent[4]='validField';
            this.state.listMessageClasses[4]='invisibleLabel'
        }
        else{
            this.props.listValidFromParent[4]='invalidField';
            this.state.listMessageClasses[4]='visibleLabel'
        }
        var list=[this.state.age,this.state.weight,this.state.pulse,this.state.blood_pressure,this.state.surgery,this.state.gender,this.state.female_cond1,this.state.female_cond2,this.state.treatment1,this.state.treatment2,this.state.treatment3,this.state.treatment4,this.state.treatment5,this.state.treatment6]
        
        this.props.handleToParent(this.props.listfromParent);
    }
    handleGender(event){
        console.log("gender radio"+event.target.value);
        //this.setState({gender:event.target.value});
       this.props.listfromParent[5]=event.target.value;
        
        
        this.props.handleToParent(this.props.listfromParent);
    }
    handleFemaleCond1(event){
        this.setState({female_cond1:event.target.value});
        console.log(event.target.value);
        this.props.listfromParent[6]=event.target.value;
        var list=[this.state.age,this.state.weight,this.state.pulse,this.state.blood_pressure,this.state.surgery,this.state.gender,this.state.female_cond1,this.state.female_cond2,this.state.treatment1,this.state.treatment2,this.state.treatment3,this.state.treatment4,this.state.treatment5,this.state.treatment6]
        
        this.props.handleToParent(this.props.listfromParent);//(list);
    }

    handleFemaleCond2(event){
        if(this.state.female_cond2==false)
        {
        
        this.props.listfromParent[7]=true;
        this.setState({female_cond2:true});
    }
        else{
            this.setState({female_cond2:false})
            this.props.listfromParent[7]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }

    handleTreatment1(event){
        //this.setState({treatment1:event.target.value});
        if(this.state.treatment1==false)
        {
        
        this.props.listfromParent[8]=true;
        this.setState({treatment1:true});
    }
        else{
            this.setState({treatment1:false})
            this.props.listfromParent[8]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
       
    }
    handleTreatment2(event){
        if(this.state.treatment2==false)
        {
        
        this.props.listfromParent[9]=true;
        this.setState({treatment2:true});
    }
        else{
            this.setState({treatment2:false})
            this.props.listfromParent[9]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleTreatment3(event){
        if(this.state.treatment3==false)
        {
        
        this.props.listfromParent[10]=true;
        this.setState({treatment3:true});
    }
        else{
            this.setState({treatment3:false})
            this.props.listfromParent[10]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleTreatment4(event){
        if(this.state.treatment4==false)
        {
        
        this.props.listfromParent[11]=true;
        this.setState({treatment4:true});
    }
        else{
            this.setState({treatment4:false})
            this.props.listfromParent[11]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleTreatment5(event){
        if(this.state.treatment5==false)
        {
        
        this.props.listfromParent[12]=true;
        this.setState({treatment5:true});
    }
        else{
            this.setState({treatment5:false})
            this.props.listfromParent[12]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleTreatment6(event){
        if(this.state.treatment6==false)
        {
        
        this.props.listfromParent[13]=true;
        this.setState({treatment6:true});
    }
        else{
            this.setState({treatment6:false})
            this.props.listfromParent[13]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    render(){
        return(
            
           
          <div>
               
        <div className='step' >
        <h2 className='stepName'> Conditii fiziologice</h2>
           
        <label>Varsta </label>
        <input type='number' onChange={this.handleAge} name="age" value={this.state.age} className={this.props.listValidFromParent[0]} />
        <br/><label className={this.state.listMessageClasses[0]}>{this.state.listMessage[0]}</label>
        <br /><br/>

        <label>Greutate </label>
        <input type='number' onChange={this.handleWeight} value={this.state.weight} className={this.props.listValidFromParent[1]} />
        <label>kg</label>
        <br/>
        <label className={this.state.listMessageClasses[1]}>{this.state.listMessage[1]}</label>

        <br /><br/>

        <label>Puls </label>
        <input type='number' onChange={this.handlePulse} value={this.state.pulse} min='0' className={this.props.listValidFromParent[2]}/>
        <label>batai/minut</label><br/>
        <label className={this.state.listMessageClasses[2]}>{this.state.listMessage[2]}</label>
        <br /><br/>

        <label>Tensiune arteriala sistolica </label>
        <input type='number' onChange={this.handleBloodPressure} value={this.state.blood_pressure} className={this.props.listValidFromParent[3]} />
        <label>mmHg</label><br/>
        <label className={this.state.listMessageClasses[3]}>{this.state.listMessage[3]}</label>
        <br /><br/>

        <label>Interventii chirurgicale in ultimele 6 luni:  </label>
       
        <select size={1} onChange={this.handleSurgery} value={this.state.surgery} className={this.props.listValidFromParent[4]}>
            
            <option>Da</option>
            <option>Nu</option>
            

            </select>
            <br/><br/>

        <label>Sex </label>
        <input type="radio" name="gender" value='M' defaultChecked={this.props.listfromParent[14]} onClick={this.isMSelected}   /> M
        <input type="radio" name="gender" value='F' defaultChecked={this.props.listfromParent[15]} onClick={this.isFSelected}  /> F

        <br/><br/>
        
              
        <div className={this.state.femaleselection} > 
               
        <label>Cazuri speciale:  </label>
        <br/><br/>
        <label>Sarcina  </label>
        <select onChange={this.handleFemaleCond1} value={this.state.female_cond1}>
        <option>Nu e cazul</option>
            <option>Insarcinata</option>
            <option>Perioada de lehuzie</option>
            </select>
        <br/><br/>
        <input type="checkbox" onClick={this.handleFemaleCond2} defaultChecked={this.state.female_cond2}/> In perioada menstruala<br/>

            
            <br/><br/>
        </div>

        
        <label>Urmez tratament pentru: </label><br/><br/>
        <input type="checkbox" onClick={this.handleTreatment1} defaultChecked={this.state.treatment1}/> hipertensiune<br/><br/>
        <input type="checkbox" onClick={this.handleTreatment2} defaultChecked={this.state.treatment2}/> boli de inima<br/><br/>
        <input type="checkbox" onClick={this.handleTreatment3} defaultChecked={this.state.treatment3}/> boli renale<br/><br/>
        <input type="checkbox" onClick={this.handleTreatment4} defaultChecked={this.state.treatment4}/> boli psihice<br/><br/>
        <input type="checkbox" onClick={this.handleTreatment5} defaultChecked={this.state.treatment5}/> boli hepatice<br/><br/>
        <input type="checkbox" onClick={this.handleTreatment6} defaultChecked={this.state.treatment6}/> boli endocrine

        
        
        <br/><br/><br/>
        
       



</div>
        
        </div>

      
    )
    }
}

