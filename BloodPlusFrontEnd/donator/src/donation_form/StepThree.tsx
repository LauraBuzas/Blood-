import React from "react";
import ReactDOM from "react-dom";
import HeaderForm from './HeaderForm';

import './FormStyle.css';


export interface StepThreeProps{
  
  handleToParent:Function;
  listfromParent:any
    
}

interface StepThreeState{

    
   hepatitis:boolean;
   tuberculosis:boolean;
   pox:boolean;
   malaria:boolean;
   epilepsy:boolean;
   psychic_disease:boolean;
   brucellosis:boolean;
   ulcer:boolean;
   diabetes:boolean;
   heart_disease:boolean;
   skin_disease:boolean;
   myopia:boolean;
   cancer:boolean;



}

export default class StepThree extends React.Component<StepThreeProps,StepThreeState>{

    constructor(props){
        super(props);
        this.state={hepatitis:this.props.listfromParent[0],
            tuberculosis:this.props.listfromParent[1],
            pox:this.props.listfromParent[2],
            malaria:this.props.listfromParent[3],
            epilepsy:this.props.listfromParent[4],
            psychic_disease:this.props.listfromParent[5],
            brucellosis:this.props.listfromParent[6],
            ulcer:this.props.listfromParent[7],
            diabetes:this.props.listfromParent[8],
            heart_disease:this.props.listfromParent[9],
            skin_disease:this.props.listfromParent[10],
            myopia:this.props.listfromParent[11],
            cancer:this.props.listfromParent[12]}

        this.handleHepatitis=this.handleHepatitis.bind(this);
        this.handleBrucellosis=this.handleBrucellosis.bind(this);
        this.handleCancer=this.handleCancer.bind(this);
        this.handleDiabetes=this.handleDiabetes.bind(this);
        this.handleEpilepsy=this.handleEpilepsy.bind(this);
        this.handleHeart=this.handleHeart.bind(this);
        this.handleMalaria=this.handleMalaria.bind(this);
        this.handleMyopia=this.handleMyopia.bind(this);
        this.handlePox=this.handlePox.bind(this);
        this.handlePsychic=this.handlePsychic.bind(this);
        this.handleSkin=this.handleSkin.bind(this);
        this.handleTuberculosis=this.handleTuberculosis.bind(this);
        this.handleUlcer=this.handleUlcer.bind(this);    
    }

    handleHepatitis(event){
        
      
        if(this.state.hepatitis==false)
        {
        
        this.props.listfromParent[0]=true;
        this.setState({hepatitis:true});
    }
        else{
            this.setState({hepatitis:false})
            this.props.listfromParent[0]=false;
        }
        

      
        this.props.handleToParent(this.props.listfromParent);
    }

    handleTuberculosis(event){
       
        if(this.state.tuberculosis==false)
        {
        
        this.props.listfromParent[1]=true;
        this.setState({tuberculosis:true});
    }
        else{
            this.setState({tuberculosis:false})
            this.props.listfromParent[1]=false;
        }
        
        this.props.handleToParent(this.props.listfromParent);
    }
    handlePox(event){
        if(this.state.pox==false)
        {
        
        this.props.listfromParent[2]=true;
        this.setState({pox:true});
    }
        else{
            this.setState({pox:false})
            this.props.listfromParent[2]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleMalaria(event){
        if(this.state.malaria==false)
        {
        
        this.props.listfromParent[3]=true;
        this.setState({malaria:true});
    }
        else{
            this.setState({malaria:false})
            this.props.listfromParent[3]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleEpilepsy(event){
        if(this.state.epilepsy==false)
        {
        
        this.props.listfromParent[4]=true;
        this.setState({epilepsy:true});
    }
        else{
            this.setState({epilepsy:false})
            this.props.listfromParent[4]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handlePsychic(event){
        if(this.state.psychic_disease==false)
        {
        
        this.props.listfromParent[5]=true;
        this.setState({psychic_disease:true});
    }
        else{
            this.setState({psychic_disease:false})
            this.props.listfromParent[5]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }

    handleBrucellosis(event){
        if(this.state.brucellosis==false)
        {
        
        this.props.listfromParent[6]=true;
        this.setState({brucellosis:true});
    }
        else{
            this.setState({brucellosis:false})
            this.props.listfromParent[6]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleUlcer(event){
        if(this.state.ulcer==false)
        {
        
        this.props.listfromParent[7]=true;
        this.setState({ulcer:true});
    }
        else{
            this.setState({ulcer:false})
            this.props.listfromParent[7]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleDiabetes(event){
        if(this.state.diabetes==false)
        {
        
        this.props.listfromParent[8]=true;
        this.setState({diabetes:true});
    }
        else{
            this.setState({diabetes:false})
            this.props.listfromParent[8]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleHeart(event){
        if(this.state.heart_disease==false)
        {
        
        this.props.listfromParent[9]=true;
        this.setState({heart_disease:true});
    }
        else{
            this.setState({heart_disease:false})
            this.props.listfromParent[9]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleSkin(event){
        if(this.state.skin_disease==false)
        {
        
        this.props.listfromParent[10]=true;
        this.setState({skin_disease:true});
    }
        else{
            this.setState({skin_disease:false})
            this.props.listfromParent[10]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleMyopia(event){
        if(this.state.myopia==false)
        {
        
        this.props.listfromParent[11]=true;
        this.setState({myopia:true});
    }
        else{
            this.setState({myopia:false})
            this.props.listfromParent[11]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }
    handleCancer(event){
        if(this.state.cancer==false)
        {
        
        this.props.listfromParent[12]=true;
        this.setState({cancer:true});
    }
        else{
            this.setState({cancer:false})
            this.props.listfromParent[12]=false;
        }
        this.props.handleToParent(this.props.listfromParent);
    }

    render(){
        return(
            <div >
            
            
        <div className='step'>
        <h2 className='stepName'> Antecedente medicale</h2>
           
        
        
        <label>Bifati afectiunile de care suferiti sau ati suferit: </label><br/><br/>
        <input type="checkbox" onClick={this.handleHepatitis} defaultChecked={this.state.hepatitis}  /> hepatita<br/><br/>
        <input type="checkbox" onClick={this.handleTuberculosis} defaultChecked={this.state.tuberculosis}/> TBC<br/><br/>
        <input type="checkbox" onClick={this.handlePox} defaultChecked={this.state.pox}/> sifilis<br/><br/>
        <input type="checkbox" onClick={this.handleMalaria} defaultChecked={this.state.malaria}/> malarie<br/><br/>
        <input type="checkbox" onClick={this.handleEpilepsy} defaultChecked={this.state.epilepsy}/> epilepsie si alte boli neurologice<br/><br/>
        <input type="checkbox" onClick={this.handlePsychic} defaultChecked={this.state.psychic_disease}/> boli psihice<br/><br/>
        <input type="checkbox" onClick={this.handleBrucellosis} defaultChecked={this.state.brucellosis}/> bruceloza<br/><br/>
        <input type="checkbox" onClick={this.handleUlcer} defaultChecked={this.state.ulcer}/> ulcer<br/><br/>
        <input type="checkbox" onClick={this.handleDiabetes} defaultChecked={this.state.diabetes}/> diabet zaharat<br/><br/>
        <input type="checkbox" onClick={this.handleHeart} defaultChecked={this.state.heart_disease}/> boli de inima<br/><br/>
        <input type="checkbox" onClick={this.handleSkin} defaultChecked={this.state.skin_disease}/> boli de piele: psoriazis, vitiligo<br/><br/>
        <input type="checkbox" onClick={this.handleMyopia} defaultChecked={this.state.myopia}/> miopie forte peste (-) 6 dioptri<br/><br/>
        <input type="checkbox" onClick={this.handleCancer} defaultChecked={this.state.cancer}/> cancer<br/><br/>

        </div>

        </div>
    )
    }
}

