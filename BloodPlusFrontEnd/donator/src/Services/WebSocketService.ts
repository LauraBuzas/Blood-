import axios from 'axios';
import * as signalR from '@aspnet/signalr';
import { HubConnection} from '@aspnet/signalr';
import { DoctorRequest } from '../Components/Doctor/DoctorRequest/DoctorRequest';


export class WebSocketService {
    private  root: string = 'http://localhost:50272/broadcaster';
    private  _connection: HubConnection;
    private SendRequest:boolean;
    constructor()
    {
        this._connection = new signalR.HubConnection(this.root);
        this.SendRequest=false;
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
    
    public  requestNotification(requestAdded: (request: DoctorRequest) => void) { 
        if(!this.SendRequest)
        {
            this._connection.on('SendRequest', (request: DoctorRequest) => {
           requestAdded(request);
            });
            this.SendRequest=true;
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