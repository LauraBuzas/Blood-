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
export interface DoctorRequestProps{}

interface DoctorRequestState
{
    requests: IDoctorRequestView[],
    message: string,
    addRequest: boolean,
    showDetails: boolean,
    currentRow: IDoctorRequestView
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
            currentRow:undefined
        }
        this.closeDetails=this.closeDetails.bind(this);
        
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
                    message: "A apărut o eroare la aducerea datelor despre doctori"
                    
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
    
    render()
    {
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
                <div className="newRequest">
                    <Button1 text="Adaugati o noua cerere" onClickFunction={()=>this.addNewRequest()}>

                    </Button1>
                </div>
                {this.state.addRequest?<ModalDoctorRequest onClose={()=>this.closeModal()}/>:null}
                <div className="tableArea">
                <BootstrapTable data={this.state.requests}
                                stripped={true}
                                hover={true}
                                search={ true }
                                selectRow={selectRowProp}
                                options={options}
                            >
                    <TableHeaderColumn isKey={true} dataField='id'>Id Request</TableHeaderColumn>
                    <TableHeaderColumn dataField='CNP'>CNP Pacient</TableHeaderColumn>
                    <TableHeaderColumn dataField='fullName'>Nume</TableHeaderColumn>
                    <TableHeaderColumn dataField='requestedQuantity'>Cantitate Ceruta</TableHeaderColumn>
                    <TableHeaderColumn dataField='currentQuantity'>Cantitate Curenta</TableHeaderColumn>
                    <TableHeaderColumn dataField='requestedComponent'>Componenta Ceruta</TableHeaderColumn>
                    <TableHeaderColumn dataField='emergencyLevel'>Grad de Urgenta</TableHeaderColumn>
                </BootstrapTable>

                </div>
                <Alert stack={true} timeout={3000}/>
                {this.state.showDetails?<ModalDoctorRequestView row={this.state.currentRow} onClose={this.closeDetails}/>:null}
            </div>
        )
    }
}