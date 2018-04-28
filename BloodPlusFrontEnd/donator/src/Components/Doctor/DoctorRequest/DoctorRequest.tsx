import * as React from 'react'
import './DoctorRequest.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ISelection } from '../../../Models/ISelection';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../../../css/Button.css'
import { IDoctorRequestView } from '../../../Models/IDoctorRequestView';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet'
import Alert from 'react-s-alert';
export interface DoctorRequestProps{}

interface DoctorRequestState
{
    requests: IDoctorRequestView[]
}

export class DoctorRequest extends React.Component<DoctorRequestProps,DoctorRequestState>
{
    

    constructor(props:DoctorRequestProps)
    {
        super(props);
        this.state=
        {
            requests:[]
        }
        
    }

   
   
    render()
    {
       
        return(
            <div className="container-requests">  
                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                </Helmet>    
                <div className="newRequest">
                </div>
                <BootstrapTable data={this.state.requests}
                                stripped={true}
                                hover={true}
                                search={ true }
                                // selectRow={this.onSelectRow}
                            >
                    <TableHeaderColumn dataField='patient'>Pacient</TableHeaderColumn>
                    <TableHeaderColumn dataField='requestedQuantity'>Cantitate Ceruta</TableHeaderColumn>
                    <TableHeaderColumn dataField='currentQuantity'>Cantitate Curenta</TableHeaderColumn>
                    <TableHeaderColumn dataField='requestedComponent'>Componenta Ceruta</TableHeaderColumn>
                    <TableHeaderColumn dataField='emergencyLevel'>Grad de Urgenta</TableHeaderColumn>
                </BootstrapTable>
                <Alert stack={true} timeout={3000} />
            </div>
        )
    }
}