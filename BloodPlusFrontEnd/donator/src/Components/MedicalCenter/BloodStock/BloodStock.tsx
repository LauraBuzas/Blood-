import * as React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet';
import './blood-stock.css';
import {BloodStockModel} from '../../../Models/BloodStockModel';

interface BloodStockProps{}
interface BloodStockState {
    bloodStock: BloodStockModel[]
}

export class CenterBloodStock extends React.Component<BloodStockProps, BloodStockState> {
    constructor(props: BloodStockProps) {
        super(props);
        this.state = {
            bloodStock: []
        }
    }



    render() {
        const options = {
            noDataText: "Nu exista pungi de sange pe stoc"
        }

        return(
            <div id="stock-table">
                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                </Helmet>
                <BootstrapTable
                    data={this.state.bloodStock}
                    striped
                    hover
                    search
                    options={options}
                    exportCSV
                >
                
                    <TableHeaderColumn dataField="type">Tip</TableHeaderColumn>
                    <TableHeaderColumn dataField="group">Grupa</TableHeaderColumn>
                    <TableHeaderColumn dataField="rh">Rh</TableHeaderColumn>
                    <TableHeaderColumn dataField="donor">Donator</TableHeaderColumn>
                    <TableHeaderColumn dataField="date" isKey={true}>Data</TableHeaderColumn>
                    <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}