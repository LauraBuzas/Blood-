import * as React from 'react';
import {Route} from 'react-router-dom';
import { HospitalAdmin } from '../Doctor/HospitalAdmin/HospitalAdmin';
import { CenterAdmin } from '../MedicalCenter/CenterAdmin/CenterAdmin';
import { Register } from '../../main_components/Register';
import { LogIn } from '../../main_components/LogIn';
import { SignUp } from '../../main_components/SignUp';
import { DoctorRequest } from '../Doctor/DoctorRequest/DoctorRequest';
import { HomePage } from '../HomePage/HomePage';

import "../../css/Body.css";
import { EmployeeProfile } from '../EmployeeProfile/EmployeeProfile';
export interface BodyProps{
    setRole:any;
} 
interface BodyState{
    // height: Number;
} 

export class Body extends React.Component<BodyProps,BodyState>
{
    constructor(props:BodyProps)
    {
        super(props);
        // this.state = {
        //     height: 0
        // };
        
    }

    render()
    {
        const HospitalAdminComponent=()=>{return <HospitalAdmin/>}
        const CenterAdminComponent=()=>{return <CenterAdmin/>}
        const LoginComponent=()=>{return <Register setRole={this.props.setRole} />}
        const RegisterComponent=()=>{return <SignUp/>}
        const DoctorRequestCompoent=()=>{return <DoctorRequest/>}
        const EmployeeProfileComponent=()=>{return <EmployeeProfile/>}
        const HomeComponent = () => {return <HomePage/>}
        // console.log("body height: " + this.state.height);
        // let newHeight = parseInt(document.getElementById("body").style.height);
        // if (newHeight) {
        //     this.setState({height: newHeight });
        // }
        
        return(
           <div id="body">
                <Route path ="/hospital/admin" exact={true} render={HospitalAdminComponent}/>
                <Route path ="/center/admin" exact={true} render={CenterAdminComponent}/>
                <Route path="/login" exact={true} render={LoginComponent}/>
                <Route path="/register" exact={true} render={RegisterComponent}/>
                <Route path="/request" exact={true} render={DoctorRequestCompoent}/>
                <Route path="/employee/profile" exact={true} render={EmployeeProfileComponent}/>
                <Route path="/" exact={true} render={HomeComponent}/>
           </div> 
        )
    }



}