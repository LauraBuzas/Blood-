import * as React from 'react';
import {Route} from 'react-router-dom';
import { HospitalAdmin } from '../Doctor/HospitalAdmin/HospitalAdmin';
import { CenterAdmin } from '../MedicalCenter/CenterAdmin/CenterAdmin';
import { Register } from '../../main_components/Register';
import { LogIn } from '../../main_components/LogIn';
import { SignUp } from '../../main_components/SignUp';
import { HomePage } from '../HomePage/HomePage';

import "../../css/Body.css";
import { DonorTestsPage } from '../Donor/DonorTests/DonorTests';
import { DoctorProfile } from '../DoctorProfile/DoctorProfile';
import { DonorProfile } from '../DonorProfile/DonorProfile';
import { ModalDoctorRequest } from '../Modal/ModalDoctorRequest';
import { CenterBloodStock } from '../MedicalCenter/BloodStock/BloodStock';

import { EmployeeProfile } from '../EmployeeProfile/EmployeeProfile';
import { DoctorRequest } from '../Doctor/DoctorRequest/DoctorRequest';
import { CenterRequest } from '../MedicalCenter/CenterRequests';
import { WebSocketService } from '../../Services/WebSocketService';
export interface BodyProps{
    setRole:any;
    webSocket:WebSocketService;
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
        const DoctorRequestCompoent=()=>{return <DoctorRequest/>}
        const EmployeeProfileComponent=()=>{return <EmployeeProfile/>}
        const HomeComponent = () => {return <HomePage/>}
        const DoctorProfileComponent = () => {return <DoctorProfile/>}
        const DonorProfileComponent = () =>{return <DonorProfile/>}
        const EmployeeStockComponent = () => {return <CenterBloodStock/>}
        // console.log("body height: " + this.state.height);
        // let newHeight = parseInt(document.getElementById("body").style.height);
        // if (newHeight) {
        //     this.setState({height: newHeight });
        // }
        const CenterRequestComponent=()=>{return <CenterRequest webSocket={this.props.webSocket}/>}
        const DoctorRequestComponent=()=>{return <DoctorRequest/>}
        const DonorTestsComponent=()=>{return <DonorTestsPage/>}
       
        return(
           <div id="body">
                <Route path="/" exact={true} render={HomeComponent}/>
                <Route path="/hospital/admin" exact={true} render={HospitalAdminComponent}/>
                <Route path="/center/admin" exact={true} render={CenterAdminComponent}/>
                <Route path="/login" exact={true} render={LoginComponent}/>
                <Route path="/register" exact={true} render={RegisterComponent}/>
                <Route path="/request" exact={true} render={DoctorRequestComponent}/>
                <Route path="/employee/profile" exact={true} render={EmployeeProfileComponent}/>
                <Route path="/donor/analyses" exact={true} render={DonorTestsComponent}/> 
                <Route path="/donor/profile" exact={true} render={DonorProfileComponent}/>
                <Route path="/doctor/profile" exact={true} render={DoctorProfileComponent}/>
                <Route path="/employees/stock" exact={true} render={EmployeeStockComponent} />
                <Route path="/employee/requests" exact={true} render={CenterRequestComponent}/>
                //<Route path="/analyses" exact={true} render={DonorComponent}/>              
                <Route path="/" exact={true} render={HomeComponent}/>
                <div id="push">
                    {/* for footer */}
                </div>
           </div> 
        )
    }



}