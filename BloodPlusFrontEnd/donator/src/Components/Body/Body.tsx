import * as React from 'react';
import {Route} from 'react-router-dom';
import { HospitalAdmin } from '../HospitalAdmin/HospitalAdmin';
import { CenterAdmin } from '../CenterAdmin/CenterAdmin';
import { Register } from '../../main_components/Register';

export interface BodyProps{
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
        const LoginAndRegisterComponent=()=>{return <Register/>}
       
        return(
           <div>
                <Route path ="/hospital/admin" exact={true} render={HospitalAdminComponent}/>
                <Route path ="/center/admin" exact={true} render={CenterAdminComponent}/>
                <Route path="/signUp" exact={true} render={LoginAndRegisterComponent}/>
              
           </div> 
        )
    }



}