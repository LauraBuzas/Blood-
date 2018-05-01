import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { IDonorMedicalTest } from '../../../Models/IDonorMedicalTests';
interface DonorProfileProps {

}

interface DonorProfileState {
    donorPastTests: IDonorMedicalTest[]
}

export class DonorProfilePage extends React.Component<DonorProfileProps, DonorProfileState> {

    constructor(props) {
        super(props);
        this.state = {
            donorPastTests: []
        }
    }

    render() {
        return(
            <div>
                <BootstrapTable data={this.state.donorPastTests}>
                    <TableHeaderColumn isKey={true} dataField="cnp">CNP</TableHeaderColumn>
                    <TableHeaderColumn dataField="data">Data</TableHeaderColumn>
                    <TableHeaderColumn dataField="results">Rezultate analize</TableHeaderColumn>

                </BootstrapTable>
            </div>
        );
    }
}