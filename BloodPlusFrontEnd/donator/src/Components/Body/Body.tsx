import * as React from 'react';
import {Route} from 'react-router-dom';
import { HospitalAdmin } from '../HospitalAdmin/HospitalAdmin';
import { CenterAdmin } from '../CenterAdmin/CenterAdmin';
import { Register } from '../../main_components/Register';
import { LogIn } from '../../main_components/LogIn';
import { SignUp } from '../../main_components/SignUp';
import { DoctorRequest } from '../DoctorRequest/DoctorRequest';
import { Donor } from '../Donor/Donor';

export interface BodyProps{
    setRole:any;
} 
interface BodyState{} 

export class Body extends React.Component<BodyProps,BodyState>
{
    constructor(props:BodyProps)
    {
        super(props);
        this.state={};
        
    }
 
  
    

    render()
    {
        const HospitalAdminComponent=()=>{return <HospitalAdmin/>}
        const CenterAdminComponent=()=>{return <CenterAdmin/>}
        const LoginComponent=()=>{return <Register setRole={this.props.setRole} />}
        const RegisterComponent=()=>{return <SignUp/>}
        const DoctorRequestComponent=()=>{return <DoctorRequest/>}
        const DonorComponent=()=>{return <Donor/>}
       
        return(
           <div>
                <Route path ="/hospital/admin" exact={true} render={HospitalAdminComponent}/>
                <Route path ="/center/admin" exact={true} render={CenterAdminComponent}/>
                <Route path="/login" exact={true} render={LoginComponent}/>
                <Route path="/register" exact={true} render={RegisterComponent}/>
                <Route path="/request" exact={true} render={DoctorRequestComponent}/>
                <Route path="/analyses" exact={true} render={DonorComponent}/>
              
           </div> 
        )
    }



}