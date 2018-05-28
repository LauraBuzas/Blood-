import axios from 'axios';
import * as signalR from '@aspnet/signalr';
import { HubConnection} from '@aspnet/signalr';
import { DoctorRequest } from '../Components/Doctor/DoctorRequest/DoctorRequest';
import { IEmployeeRequest } from '../Models/IEmployeeRequest';
import { IDoctorRequestView } from '../Models/IDoctorRequestView';

export class WebSocketService {
    private  root: string = 'http://localhost:51401/broadcaster';
    private  _connection: HubConnection;

    constructor()
    {
        this._connection = new signalR.HubConnection(this.root);
    }

    public async startConnection(groupname:string)
    {          
       await this._connection.start().then(()=>{this.subscribeToAGroup(groupname)}); //.catch(err => console.error(err, 'red'));  
    }
    
    public requestNotification(requestAdded: (request: IEmployeeRequest) => void) { 
        this._connection.on('SendRequest', (request: IEmployeeRequest) => {
           requestAdded(request);
       });
    }

    public requestAcceptedNotification(requestAccepted:()=>void) { 
        this._connection.on('AcceptRequest', () => {
            requestAccepted();
       });
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