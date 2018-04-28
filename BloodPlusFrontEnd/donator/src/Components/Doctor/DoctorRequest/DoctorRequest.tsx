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
export interface DoctorRequestProps{}

interface DoctorRequestState
{
    requests: IDoctorRequestView[],
    message: string,
    addRequest: boolean
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
            addRequest:false
        }
        
    }

    componentDidMount() {
        
    
       
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
    }
   
    render()
    {
       
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
                                // selectRow={this.onSelectRow}
                            >
                    <TableHeaderColumn isKey={true} dataField='patient'>Pacient</TableHeaderColumn>
                    <TableHeaderColumn dataField='requestedQuantity'>Cantitate Ceruta</TableHeaderColumn>
                    <TableHeaderColumn dataField='currentQuantity'>Cantitate Curenta</TableHeaderColumn>
                    <TableHeaderColumn dataField='requestedComponent'>Componenta Ceruta</TableHeaderColumn>
                    <TableHeaderColumn dataField='emergencyLevel'>Grad de Urgenta</TableHeaderColumn>
                </BootstrapTable>
                </div>
                <Alert stack={true} timeout={3000} />
            </div>
        )
    }
}