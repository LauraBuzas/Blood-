import React from "react";
import ReactDOM from "react-dom";
import HeaderForm from './HeaderForm'
import StepTwo from './StepTwo';
import StepOne from './StepOne';
import StepThree from './StepThree';
import FinalStep from './FinalStep';
import './FormStyle.css'
import validator from 'validator';
import './prog_tracker.css'
import { HomePage } from '../Components/HomePage/HomePage';
import Succes from './Succes'

import {DonorService} from '../Services/DonorService'
import {Redirect} from 'react-router-dom'
//import { IDonorRegisterForDonation } from "../Models/IDonorRegisterForDonation";
import {IDonorRegistrationForDonation} from "../Models/IDonorRegistrationForDonation"
import {IDonorRegistrationData} from '../Models/IDonorRegistrationData'
export interface MultiStepProps {
    
}

interface MultiStepState {
   comp:number;
   backclass:string;
   nextclass:string;
   nextbtnclass:string;
   comp0:string;
   comp1:string;
   comp2:string;
   comp3:string;
   list_data1:any;
   list_data2:any;
   list_data3:any;
   list_data4:any;
   listValid1:any;
   listValidMessage1:any
   listValid2:any;
   listValidMessage2:any;
   listValid4:any;
   listValidMessage4:any;
   validation_msg:string;
   

  
  
   
   
}

export  class MultiStep extends React.Component<MultiStepProps,MultiStepState>{

    constructor(props){
        super(props);
      
        
        this.nextComponent=this.nextComponent.bind(this);
        this.prevComponent=this.prevComponent.bind(this);
        this.state={comp:0,backclass:'buttonBack',nextbtnclass:'buttonNext',nextclass:'Urmator',comp0:'progtrckr-doing',comp1:'progtrckr-todo',comp2:'progtrckr-todo',comp3:'progtrckr-todo',
       list_data1:['','',new Date(),'','','','',''],
      // list_data1:[donor1.name,donor1.surname,donor1.dob,donor1.cityD,donor1.countyD,'','',donor1.cnp],
        list_data2:[0,0,0,0,'Nu','M','',false,false,false,false,false,false,false,true,false],
        list_data3:[false,false,false,false,false,false,false,false,false,false,false,false,false,],
       
        list_data4:["","","",""],
        listValid1:['validField','validField','validField','validField','validField','validField','validField','validField'],
        listValid2:['validField','validField','validField','validField','validField'],
        listValid4:['validField','validField'],
        listValidMessage1:['invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel'],
        listValidMessage2:['invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel','invisibleLabel'],
        listValidMessage4:['invisibleLabel','invisibleLabel'],
        validation_msg:"Sunteti eligibil sa donati",
      
      
        
        
    }
    DonorService.getDonorData().then((donor:IDonorRegistrationData) => {
        this.setState({
           list_data1:[donor.name,donor.surname,donor.dob,donor.cityD,donor.countyD,"","",donor.cnp],
           
        });    
    });
    this.handlefromChild=this.handlefromChild.bind(this);
    this.validateStepOne=this.validateStepOne.bind(this);
    this.validateStepTwo=this.validateStepTwo.bind(this);
    this.validateStepFour=this.validateStepFour.bind(this);
    
    }
    

  

    handlefromChild(listdata){
       switch(this.state.comp){
            case 0:
            this.setState({list_data1:listdata});
            break;
            case 1:
            this.setState({list_data2:listdata});
            break;
            case 2:
            this.setState({list_data3:listdata});
            break;
            case 3:
            this.setState({list_data4:listdata});
            break;
            

           


        }
       
        
    }

    validateStepOne(){
      
     
        var d= new Date();
        var dinput=new Date(this.state.list_data1[2]);
  
        
       if(this.state.list_data1[0]=="" || (!validator.isAlpha(this.state.list_data1[0]) && !validator.contains(this.state.list_data1[0],'-')) ){
          
          this.state.listValid1[0]='invalidField';
          this.state.listValidMessage1[0]='visibleLabel'

       }
       else{
        this.state.listValid1[0]='validField';
        this.state.listValidMessage1[0]='invisibleLabel'
       }
       if(this.state.list_data1[1]=="" || (!validator.isAlpha(this.state.list_data1[1]) && !validator.contains(this.state.list_data1[1],'-'))){
        this.state.listValid1[1]="invalidField";
        this.state.listValidMessage1[1]='visibleLabel'
       }
       else{
        this.state.listValid1[1]='validField';
        this.state.listValidMessage1[1]='invisibleLabel'
       }
    
      
       if(dinput.getDate()>=d.getDate() && dinput.getMonth()>=d.getMonth() && dinput.getFullYear()>=d.getFullYear()){
         
        this.state.listValid1[2]="invalidField";
        this.state.listValidMessage1[2]='visibleLabel'
       }
       else{
        this.state.listValid1[2]='validField';
        this.state.listValidMessage1[2]='invisibleLabel'
       }

       
       
       if(this.state.list_data1[3]=="" || (!validator.isAlpha(this.state.list_data1[3]) && !validator.contains(this.state.list_data1[3],'-'))){
        this.state.listValid1[3]="invalidField";
        this.state.listValidMessage1[3]='visibleLabel'
       }
       else{
        this.state.listValid1[3]='validField';
        this.state.listValidMessage1[3]='invisibleLabel'
       }
       if(this.state.list_data1[4]=="" || (!validator.isAlpha(this.state.list_data1[4]) && !validator.contains(this.state.list_data1[4],'-'))){
        this.state.listValid1[4]="invalidField";
        this.state.listValidMessage1[4]='visibleLabel'
     }
     else{
        this.state.listValid1[4]='validField';
        this.state.listValidMessage1[4]='invisibleLabel'
       }
     if(this.state.list_data1[5]=="" || (!validator.isAlpha(this.state.list_data1[5]) && !validator.contains(this.state.list_data1[5],'-'))){
        this.state.listValid1[5]="invalidField";
        this.state.listValidMessage1[5]='visibleLabel'
        
     }
     else{
        this.state.listValid1[5]='validField';
        this.state.listValidMessage1[5]='invisibleLabel'
       }
     if(this.state.list_data1[6]=="" || (!validator.isAlpha(this.state.list_data1[6]) && !validator.contains(this.state.list_data1[6],'-'))){
        this.state.listValid1[6]="invalidField";
        this.state.listValidMessage1[6]='visibleLabel'
     }
     else{
        this.state.listValid1[6]='validField';
        this.state.listValidMessage1[6]='invisibleLabel'
       }

       if(this.state.list_data1[7]=="" || (!(validator.isNumeric(this.state.list_data1[7])) )){
        this.state.listValid1[7]="invalidField";
        this.state.listValidMessage1[7]='visibleLabel'
     }
     else{
        this.state.listValid1[7]='validField';
        this.state.listValidMessage1[7]='invisibleLabel'
       }



     this.setState({listValid1:this.state.listValid1});
     this.setState({listValidMessage1:this.state.listValidMessage1})
    


        
       }


       validateStepTwo(){
        console.log("e in 2")
        if(this.state.list_data2[0]<=0){
            this.state.listValid2[0]="invalidField";
            this.state.listValidMessage2[0]='visibleLabel'
        }
        else{
            this.state.listValid2[0]="validField";
            this.state.listValidMessage2[0]='invisibleLabel'
        }


        var d=new Date();
        
        var dat=new Date(this.state.list_data1[2]);
        console.log("date:"+d.getFullYear()+" ,"+dat.getFullYear());
        console.log(d.getFullYear()-dat.getFullYear());
        if(Math.abs((d.getFullYear()-dat.getFullYear())-this.state.list_data2[0])>1){
            this.state.listValid2[0]="invalidField";
            this.state.listValidMessage2[0]='visibleLabel'
        }
        else{
            this.state.listValid2[0]="validField";
            this.state.listValidMessage2[0]='invisibleLabel'
        }
        if(this.state.list_data2[1]<=0){
            this.state.listValid2[1]='invalidField';
            this.state.listValidMessage2[1]='visibleLabel'
        }
        else{
            this.state.listValid2[1]="validField";
            this.state.listValidMessage2[1]='invisibleLabel'
        }
        if(this.state.list_data2[2]<=0){
            this.state.listValid2[2]='invalidField';
            this.state.listValidMessage2[2]='visibleLabel'
        }
        else{
            this.state.listValid2[2]="validField";
            this.state.listValidMessage2[2]='invisibleLabel'
        }
        if(this.state.list_data2[3]<=0){
            this.state.listValid2[3]='invalidField';
            this.state.listValidMessage2[3]='visibleLabel'
        }
        else{
            this.state.listValid2[3]="validField";
            this.state.listValidMessage2[3]='invisibleLabel'
        }

        if(this.state.list_data2[4]==''){
            this.state.listValid2[4]='invalidField'
            this.state.listValidMessage2[4]='visibleLabel'
        }
        else{
            this.state.listValid2[4]="validField";
            this.state.listValidMessage2[4]='invisibleLabel'
        }

      
        this.setState({listValid2:this.state.listValid2});
        this.setState({listValidMessage2:this.state.listValidMessage2});
       }

       validateStepFour(){
        

        if(this.state.list_data4[0]=="" || !validator.isEmail(this.state.list_data4[0])){
            this.state.listValid4[0]='invalidField';
            this.state.listValidMessage4[0]='visibleLabel'
        }
        else{
            this.state.listValidMessage4[0]='invisibleLabel'
            this.state.listValid4[0]='validField'
        }
        if(this.state.list_data4[1]=="" || !validator.isNumeric(this.state.list_data4[1]) ){
           
            this.state.listValid4[1]='invalidField';
            this.state.listValidMessage4[1]='visibleLabel'
        }
        else{
            this.state.listValidMessage4[1]='invisibleLabel'
            this.state.listValid4[1]='validField'

        }

        this.setState({listValid4:this.state.listValid4});
        this.setState({listValidMessage4:this.state.listValidMessage4})
       }
    
  
    nextComponent(){
        var ok=true;
        var message='';
        console.log(this.state.comp);
        if(this.state.comp==0){
        this.validateStepOne();
        

          console.log(this.state.listValid1[0]);
          if(this.state.listValid1[0]=='invalidField'|| this.state.listValid1[1]=='invalidField'||this.state.listValid1[2]=='invalidField'||this.state.listValid1[3]=='invalidField'||this.state.listValid1[4]=='invalidField'||this.state.listValid1[5]=='invalidField'||this.state.listValid1[6]=='invalidField')
            {ok=false;}
            else{ok=true;}

        }

        if(this.state.comp==1){
            this.validateStepTwo();
            if(this.state.listValid2[0]=='invalidField'||this.state.listValid2[1]=='invalidField'||this.state.listValid2[2]=='invalidField'||this.state.listValid2[3]=='invalidField'||this.state.listValid2[4]=='invalidField')
            {ok=false;
          
            }
            else{ok=true;}
        }

        if(this.state.comp==3){
            this.validateStepFour();
            if(this.state.listValid4[0]=='invalidField'||this.state.listValid4[1]=='invalidField'){
                ok=false;
            }
            else{ok=true;}
            console.log(this.state.list_data2[0]+" "+this.state.list_data2[1]+" "+this.state.list_data2[2]+" "+this.state.list_data2[3]+" "+this.state.list_data2[4]+" "+this.state.list_data2[5]+" "+this.state.list_data2[6]+" "+this.state.list_data2[7])
        }

  // ok=true;
      if(ok)
      {  var nextcomp=this.state.comp+1;
        
        if(this.state.comp+1!=3)
      { this.setState({comp:nextcomp,backclass:'buttonBackVisible'})}
      else{
        this.setState({comp:nextcomp,backclass:'buttonBackVisible',nextclass:'Trimite'})
      }
      if(this.state.comp+1==4){
       
        var msg='';
        var ok1=true;
        msg+='Varsta: '+this.state.list_data2[0]+";"
        +"Greutate "+this.state.list_data2[1]+";"+"Puls: "+this.state.list_data2[2]+";"
        +"tensiune: "+this.state.list_data2[3]+"operatie: "+this.state.list_data2[4]+";"
        +"sex: "+this.state.list_data2[5]+";condf1: "+this.state.list_data2[6]+" ;cond2: "+
        this.state.list_data2[7]+";";
        console.log(msg);
        for(var i=8;i<=15;i++){
           console.log("tr: "+this.state.list_data2[i]+";");
        }
        for(var i=0;i<=12;i++){
            console.log("boli: "+i+" "+this.state.list_data3[i]+";");
        }

        if(this.state.list_data2[0]<18 || this.state.list_data2[0]>60){
          
            ok1=false;
            message+='Varsta trebuie sa fie minim 18 ani si maxim 60 ani.\n';
            
        }
       
       
        if(this.state.list_data2[1]<50){
           
            ok1=false;
            message+='Greutatea trebuie sa fie peste 50 kg.\n';
        }
        if(this.state.list_data2[2]<60 || this.state.list_data2[2]>100){
            
            ok1=false;
            message+='Pulsul trebuie sa fie intre 60 si 100 batai/minut.\n';
        }

        if(this.state.list_data2[3]<100 || this.state.list_data2[3]>180){
          
            ok1=false;
            message+='Tensiunea arteriala trebuie sa fie intre 100 si 180 mmHg.\n'
        }
        if(this.state.list_data2[4]!='Nu'){
           
            ok1=false;
            message+='Daca ati suferit interventii chirurgicale in ultimele 6 luni nu sunteti eligibil sa donati.\n';
        }
        if(this.state.list_data2[6]!='' && this.state.list_data2[6]!='Nu e cazul'){
            
            ok1=false;
            message+='Daca sunteti in perioada de sarcina sau lehuzie nu sunteti eligibil sa donati.\n';
        }
        for(var i=7;i<=13;i++){
            if(this.state.list_data2[i]){
                ok1=false;
            }
            switch(i){
                case 7:
                    if(this.state.list_data2[i]){
                        message+="Daca sunteti in perioada menstruala nu puteti dona sange.";
                    }
                    break;
                case 8: 
                if(this.state.list_data2[i]){
                    message+="Daca urmati tratament pentu hipertensiune nu puteti dona sange.";
                }
                break;
                case 9: 
                if(this.state.list_data2[i]){
                    message+="Daca urmati tratament pentu boli de inima nu puteti dona sange.";
                }
                break;
                case 10: 
                if(this.state.list_data2[i]){
                    message+="Daca urmati tratament pentu boli renale nu puteti dona sange.";
                }
                break;
                case 11: 
                if(this.state.list_data2[i]){
                    message+="Daca urmati tratament pentu boli psihice nu puteti dona sange.";
                }
                break;
                case 12: 
                if(this.state.list_data2[i]){
                    message+="Daca urmati tratament pentu boli hepatice nu puteti dona sange.";
                }
                break;
                case 13: 
                if(this.state.list_data2[i]){
                    message+="Daca urmati tratament pentu boli endocrine nu puteti dona sange.";
                }
                break;
                

            }
        }
        var m='Nu puteti dona sange daca suferiti de :'+"";
        
        var m1=''
        for(var i=0;i<=12;i++){
            if(this.state.list_data3[i]){
                ok1=false;
            }
            switch(i){
                case 0: 
                if(this.state.list_data3[i]){
                    m1+="hepatita";
                }
                break;
                case 1: 
                if(this.state.list_data3[i]){
                    m1+="tbc,";
                }
                break;
                case 2: 
                if(this.state.list_data3[i]){
                    m1+="sifilis,";
                }
                break;
                case 3: 
                if(this.state.list_data3[i]){
                    m1+="malarie,";
                }
                break;
                case 4: 
                if(this.state.list_data3[i]){
                    m1+="epilepsie si alte boli neurologice,";
                }
                break;
                case 5: 
                if(this.state.list_data3[i]){
                    m1+="boli psihice,";
                }
                break;
                case 6: 
                if(this.state.list_data3[i]){
                    m1+="bruceloza,";
                }
                break;
                case 7: 
                if(this.state.list_data3[i]){
                    m1+="ulcer,";
                }
                break;
                case 8: 
                if(this.state.list_data3[i]){
                    m1+="diabet zaharat,";
                }
                break;
                case 9: 
                if(this.state.list_data3[i]){
                    m1+="boli de inima,";
                }
                break;
                case 10: 
                if(this.state.list_data3[i]){
                    m1+="boli de piele: psoriazis, vitiligo,";
                }
                break;
                case 11: 
                if(this.state.list_data3[i]){
                    m1+=" miopie forte peste (-) 6 dioptri,";
                }
                break;
                case 12: 
                if(this.state.list_data3[i]){
                    m1+="cancer";
                }
                break;
                
            }
        }
        if(m1.length!=0){
            message+=m+m1;
                    }

        
       
        var surgery=this.state.list_data2[4];
        if(surgery=="Nu"){surgery="No"}
        else{surgery="Yes"}
        var psex=this.state.list_data2[5];
        if(psex=="M"){psex="Male"}
        else {psex="Female"}
        var pregnancy=this.state.list_data2[6]
        if(pregnancy=="Nu e cazul" || pregnancy==""){
            pregnancy="NotPregnant";
        }
        if(pregnancy=="Perioada de lehuzie"){
            pregnancy="PostPregnant"
        }
        if(pregnancy=="Insarcinata"){
            pregnancy="Pregnant"
        }


        

        let donorData:IDonorRegistrationForDonation;
        donorData={
            name:this.state.list_data1[0],
            surname:this.state.list_data1[1],
            birthdate:this.state.list_data1[2],
            cityofbirth:this.state.list_data1[3],
            countyofbirth:this.state.list_data1[4],
            currentcity:this.state.list_data1[5],
            currentcounty:this.state.list_data1[6],
            cnp:this.state.list_data1[7],
            age:this.state.list_data2[0],
            weigth:this.state.list_data2[1],
            beatspermiute:this.state.list_data2[2],
            bloodpressure:this.state.list_data2[3],
            hadsurgery:surgery,
            personsex:psex,
            pregnancystatus:pregnancy,
            period:this.state.list_data2[7],
            hypertension:this.state.list_data2[8],
            heartdisease:this.state.list_data2[9],
            kidneydisease:this.state.list_data2[10],
            mentalilness:this.state.list_data2[11],
            liverdisease:this.state.list_data2[12],
            endocrinedisease:this.state.list_data2[13],
            hepatitis:this.state.list_data3[0],
            tuberculosis:this.state.list_data3[1],
            pox:this.state.list_data3[2],
            malaria:this.state.list_data3[3],
            epilepsy:this.state.list_data3[4],
            mindilnesses:this.state.list_data3[5],
            brucellosis:this.state.list_data3[6],
            ulcer:this.state.list_data3[7],
            diabetes:this.state.list_data3[8],
            heartdiseases:this.state.list_data3[9],
            skindiseases:this.state.list_data3[10],
            myopia:this.state.list_data3[11],
            cancer:this.state.list_data3[12],
            email:this.state.list_data4[0],
            phonenumber:this.state.list_data4[1],
            otherpersonname:this.state.list_data4[2],
            otherpersonsurname:this.state.list_data4[3]


        }
      console.log("E valid tot.");
        DonorService.addRegistration(donorData).then((resp) => {
            console.log("primit");
           console.log(resp);
            

        },
            (error) => {
                console.log(error);
                
            });
            if(ok1)
            {this.setState({comp:nextcomp,backclass:'buttonBack',nextclass:'Ok',validation_msg:'Sunteti eligibil sa donati.'});
          
        
    }
        else{
            this.setState({comp:nextcomp,backclass:'buttonBack',nextclass:'Ok',validation_msg:'Nu sunteti eligibil sa donati.\n'+message})
        }
        
      }
     

      switch(this.state.comp){
          case 0:
          this.setState({comp0:'progtrckr-done',comp1:'progtrckr-doing'})
          break;
          case 1:
          this.setState({comp1:'progtrckr-done',comp2:'progtrckr-doing'})
          break;
          case 2:
          this.setState({comp2:'progtrckr-done',comp3:'progtrckr-doing'})
          break;
        
      }
      
      
    }
    }
    prevComponent(){
        var prevcom=this.state.comp-1;
        if(this.state.comp-1!=0){
            this.setState({comp:prevcom,backclass:'buttonBackVisible'})
        }
        else{
            this.setState({comp:prevcom,backclass:'buttonBack'})
        }
        switch(this.state.comp){
            case 1:
            this.setState({comp0:'progtrckr-doing',comp1:'progtrckr-todo'})
            break;
            case 2:
            this.setState({comp1:'progtrckr-doing',comp2:'progtrckr-todo'})
            break;
            case 3:
            this.setState({comp2:'progtrckr-doing',comp3:'progtrckr-todo'})
            break;
          
        }

    }
    
    
        

    render(){
       
       
       var list=[<StepOne handleToParent={this.handlefromChild}
         listfromParent={this.state.list_data1}
          listValidFromParent={this.state.listValid1} 
          listMessageFromParent={this.state.listValidMessage1}
          />,
        <StepTwo  handleToParent={this.handlefromChild}
                 listfromParent={this.state.list_data2}
                 listValidFromParent={this.state.listValid2}
                 listMessageFromParent={this.state.listValidMessage2}/>,
        <StepThree handleToParent={this.handlefromChild}
                   listfromParent={this.state.list_data3}
                />,
        <FinalStep handleToParent={this.handlefromChild} 
                listfromParent={this.state.list_data4} 
                listValidFromParent={this.state.listValid4}
                listMessageFromParent={this.state.listValidMessage4}
                />,
        <Succes textFromParent={this.state.validation_msg}/>
    
    ];

    
    if(this.state.comp==5 ){
        console.log("spre HP")
        //return (<HomePage/>);
        return (<Redirect to='/'></Redirect>);
     }else{
        return(
           
                
                
               <div className='innerDiv' >
                 
                   <HeaderForm/>
                   <ol className='progtrckr'>
                   <li className={this.state.comp0}><span>Date personale</span></li>
                   <li className={this.state.comp1}><span>Conditii fiziologice</span></li>
                   <li className={this.state.comp2}><span>Antecedente medicale</span></li>
                   <li className={this.state.comp3}><span>Finalizare</span></li>
                       </ol>
                    {list[this.state.comp]} 
                    
                  
                   <button className={this.state.nextbtnclass} onClick={this.nextComponent} > {this.state.nextclass} </button>
                   <button className={this.state.backclass} onClick={this.prevComponent} > Inapoi </button>
                   

                   </div>
                        
           
            

 


            
           

        
    )}
    }
}

