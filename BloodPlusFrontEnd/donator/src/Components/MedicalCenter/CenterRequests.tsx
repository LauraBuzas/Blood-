import * as React from 'react'

import * as signalR from '@aspnet/signalr';

import { DoctorRequest } from '../Doctor/DoctorRequest/DoctorRequest';
import { WebSocketService } from '../../Services/WebSocketService';

  
export interface CenterRequestProps{webSocket:WebSocketService;}
interface CenterRequestState
{
  requests:DoctorRequest[];
  notificationRequested:boolean;
}
export class CenterRequest extends React.Component<CenterRequestProps,CenterRequestState>
{

    constructor(props: CenterRequestProps) {
       
        super(props);
        this.state=
        {
            requests:[],
            notificationRequested:false
        }
        // var webSocket=new WebSocketService();
        // webSocket.startConnection();
        
       // webSocket.subscribeToAGroup("employees");
        
    }

    componentDidMount() {
     
    }
    
    addRequest(request:DoctorRequest)
    {
        var all=this.state.requests;
        all.push(request);
        this.setState({requests:all});
    }
    
    render() {
      if(this.props.webSocket!==null && !this.state.notificationRequested){
          this.props.webSocket.requestNotification((request: DoctorRequest) => {
            console.log(request);
            this.addRequest(request);
          
          });
          this.setState({notificationRequested:true});
        }
      return (
          
            // <ul >
            //   <h1>CERERI</h1>
            // {
            //   this.state.requests.forEach(element => {
            //       return (<li>element</li>);
            //   })
            // }
            // </ul>
            <div></div>
      );
    }
}

