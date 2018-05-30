import axios from 'axios';
import * as signalR from '@aspnet/signalr';
import { HubConnection} from '@aspnet/signalr';
import { DoctorRequest } from '../Components/Doctor/DoctorRequest/DoctorRequest';
import { IEmployeeRequest } from '../Models/IEmployeeRequest';
import { IDoctorRequestView } from '../Models/IDoctorRequestView';


export class WebSocketService {

    private  root: string = 'http://localhost:50272/broadcaster';

    private  _connection: HubConnection;
    private SendRequest:boolean;
    private AcceptRequest:boolean;

    constructor()
    {
        this._connection = new signalR.HubConnection(this.root);
        this.SendRequest=false;
        this.AcceptRequest = false;
    }

    getSessionId()
    {
        var sessionId = window.sessionStorage.sessionId;
        
        if (!sessionId)
        {
            sessionId = window.sessionStorage.sessionId = Date.now();
        }
        
        return sessionId;
    }

    public async startConnection(groupname:string)
    {
       await this._connection.start().then(()=>{this.subscribeToAGroup(groupname)}); //.catch(err => console.error(err, 'red'));  
    }
    
    public  requestNotification(requestAdded: (request: IEmployeeRequest) => void) { 
        if(!this.SendRequest)
        {
            this._connection.on('SendRequest', (request: IEmployeeRequest) => {
           requestAdded(request);
            });
            this.SendRequest=true;
        }
    }

    public requestAcceptedNotification(requestAccepted:()=>void) { 
        if(!this.AcceptRequest)
        {
            this._connection.on('AcceptRequest', () => {
                requestAccepted();
            });
            this.AcceptRequest=true;
        }
    }
    
    public subscribeToAGroup(groupname: string) {
        this._connection.invoke('Subscribe', groupname);
    }

    public unsubscribeToAGroup(groupname: string) {
        this._connection.invoke('Unsubscribe', groupname);
    }

   

}
// const WebsocketService = new WebSocketService();
// export default WebsocketService;