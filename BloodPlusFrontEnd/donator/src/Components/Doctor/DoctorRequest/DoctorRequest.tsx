import * as React from 'react'
import './DoctorRequest.css'
import '../../../css/Management.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ISelection } from '../../../Models/ISelection';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../../../css/Button.css'
import { IDoctorRequestView } from '../../../Models/IDoctorRequestView';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet'
import Alert from 'react-s-alert';
import { DoctorService } from '../../../Services/DoctorService';
import { Button1 } from '../../../utils/Button1';
import { ModalDoctorRequest } from '../../Modal/ModalDoctorRequest';
import {ModalDoctorRequestView} from '../DoctorRequest/Modal/ModalDoctorRequestView';
import { WebSocketService } from '../../../Services/WebSocketService';
import BellIcon from 'react-bell-icon';

export interface DoctorRequestProps
{
    webSocket:WebSocketService
}

interface DoctorRequestState
{
    requests: IDoctorRequestView[],
    message: string,
    addRequest: boolean,
    showDetails: boolean,
    currentRow: IDoctorRequestView,
    notificationRequested:boolean,
    activeBell:boolean
}

export class DoctorRequest extends React.Component<DoctorRequestProps,DoctorRequestState>
{
    

    constructor(props:DoctorRequestProps)
    {
        super(props);
        this.state=
        {
            requests:[],
            message:"",
            addRequest:false,
            showDetails:false,
            currentRow:undefined,
            notificationRequested:false,
            activeBell:false
        }
        this.closeDetails=this.closeDetails.bind(this);
        this.requestAccepted=this.requestAccepted.bind(this);
        
    }

    componentDidMount() {
        this.getRequests();
    }

    getRequests(){
        DoctorService.getRequests().then((requests:IDoctorRequestView[]) => {
            this.setState({
                requests:requests
            });    
        },
            (error) => {
                this.setState({
                    message: "A apărut o eroare la aducerea cererilor de sânge"
                    
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
            });
    }

    addNewRequest(){
        this.setState({addRequest:true});
    }

    closeModal(){
        this.setState({addRequest:false});
        this.getRequests();
    }

    onSelectRow(row){
        var currentRequest=this.state.requests.findIndex(r=>r.id==row.id);
        this.setState({currentRow:this.state.requests[currentRequest],showDetails:true});
    }
    
    closeDetails(){
        this.setState({showDetails:false});
    }
    requestAccepted()
    {
        console.log("am primit accept");
        this.getRequests();
        this.setState({activeBell:true});
        setTimeout(function(){
            this.setState({activeBell:false});
       }.bind(this),5000);
    }
    
    emergencyColumnFormat(fieldValue, row, rowIdx, colIdx) {
        // fieldValue is column value
        // row is whole row object
        // rowIdx is index of row
        // colIdx is index of column
        switch (fieldValue) {
            case ("CRITIC"):
                return "column-critical";
            case ("RIDICAT"):
                return "column-high";
            case ("MEDIU"):
                return "column-medium";
            case ("SCĂZUT"):
                return "column-low";
        }
        return "";
    }

    render()
    {
        if(this.props.webSocket!==null && !this.state.notificationRequested){
            this.props.webSocket.requestAcceptedNotification(this.requestAccepted);
            this.setState({notificationRequested:true});
        }

        const selectRowProp = {
            clickToSelect: true,           
          };
          const options = {
            onRowClick: this.onSelectRow.bind(this)
          };
       
        return(
            <div className="container-requests">  
                
                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                </Helmet>    
                <div className="new-request">

                    <button className="generic-button green-button add-request-button" onClick={()=>this.addNewRequest()}>
                    Adaugati o noua cerere
                    </button>
                    <BellIcon id="bell-icon" height="50" width='50' active={this.state.activeBell} animate={this.state.activeBell} />
                </div>
                {this.state.addRequest?<ModalDoctorRequest onClose={()=>this.closeModal()}/>:null}
                <div className="table-area">
                <BootstrapTable id="requests-table"
                                data={this.state.requests}
                                stripped={true}
                                hover={true}
                                search={ true }
                                selectRow={selectRowProp}
                                options={options}
                            >
                    <TableHeaderColumn width={40} isKey={true} dataField='id'>Id</TableHeaderColumn>
                    <TableHeaderColumn width={150} dataField='CNP'>CNP pacient</TableHeaderColumn>
                    <TableHeaderColumn width={200} dataField='fullName'>Nume</TableHeaderColumn>
                    <TableHeaderColumn width={80} dataField='requestedQuantity'>Cerut</TableHeaderColumn>
                    <TableHeaderColumn width={80} dataField='currentQuantity'>Curent</TableHeaderColumn>
                    <TableHeaderColumn width={200} dataField='requestedComponent'>Componenta ceruta</TableHeaderColumn>
                    <TableHeaderColumn width={150} dataField='emergencyLevel' columnClassName={this.emergencyColumnFormat}>Grad urgenta</TableHeaderColumn>
                    <TableHeaderColumn width={180} dataField='status'>Status</TableHeaderColumn>
                </BootstrapTable>

                </div>
                <Alert stack={true} timeout={3000}/>
                {this.state.showDetails?<ModalDoctorRequestView row={this.state.currentRow} onClose={this.closeDetails}/>:null}
            </div>
        )
    }
}