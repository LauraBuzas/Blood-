import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { IDonorMedicalTest } from '../../../Models/IDonorMedicalTests';
import {DonorService} from '../../../Services/DonorService';
import Alert from 'react-s-alert';
import './donor-profile.css';
import {Days} from 'react-countdowntimer';
import {Helmet} from 'react-helmet'

interface DonorProfileProps {

}

interface DonorProfileState {
    message: string,
    nextDate: Date,
    donorPastTests: IDonorMedicalTest[]
}

export class DonorTestsPage extends React.Component<DonorProfileProps, DonorProfileState> {

    constructor(props: DonorProfileProps) {
        super(props);
        this.state = {
            message: '',
            nextDate: null,
            donorPastTests: []
        }

    }

    componentDidMount() {
        
        DonorService.getAnalyses().then((donorPastTests: IDonorMedicalTest[]) => {
            this.setState({
                donorPastTests: donorPastTests
            });
        },
        (error) => {
            this.setState({
                message: "A apărut o eroare la aducerea datelor despre analize"
                
            });
            Alert.error(this.state.message, {
                position: 'top-right',
                effect: 'jelly'
              });
        });

        DonorService.getNextDonation().then((date: Date) => {
            //console.log(date);
            this.setState({
                nextDate: date
            });
        },
        (error) => {
            this.setState({
                message: "A apărut o eroare la aducerea urmatoarei date de donare"
                
            });
            Alert.error(this.state.message, {
                position: 'top-right',
                effect: 'jelly'
              });
        });

    }

    canDonate(date) {
  
        //console.log(date);
        console.log("next date: "+Date.parse(date));
        console.log("now: "+Date.now());
        if (date < Date.now()) {
            return true;
        }
        return false;
    }

    getDateComponent() {
        if (this.canDonate(this.state.nextDate)) {
            return(
                <h1>Puteti dona</h1>
            );
        }
        console.log(this.state.nextDate);
        return(
            <div>
               
                <h1 className="days-remaining">
                    <Days deadline={this.state.nextDate}/>
                    
                </h1>
                <div>
                    zile pana cand puteti dona din nou
                </div>
                <span className="date-text">{this.state.nextDate.toDateString()}</span>
            </div>
            
        );
    }

    render() {
        const options = {
            noDataText: "Nu exista analize medicale"
        }
        return(
            
            <div>
                {this.getDateComponent()}
                <div id="analyses-table">
                    <Helmet>
                        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                    </Helmet>
                    <BootstrapTable
                        data={this.state.donorPastTests}
                        striped
                        hover
                        search
                        options={options}
                        exportCSV
                    >
                    
                        <TableHeaderColumn dataField="date" isKey={true}>Data</TableHeaderColumn>
                        <TableHeaderColumn dataField="results">Rezultate analize</TableHeaderColumn>

                    </BootstrapTable>
                </div>
                
            </div>
        );
    }
}