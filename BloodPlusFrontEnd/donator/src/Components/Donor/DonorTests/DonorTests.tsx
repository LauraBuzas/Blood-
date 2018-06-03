import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { IDonorMedicalTest } from '../../../Models/IDonorMedicalTests';
import {DonorService} from '../../../Services/DonorService';
import Alert from 'react-s-alert';
import './donor-profile.css';
import {Days} from 'react-countdowntimer';
import {Helmet} from 'react-helmet'
import { IMedicalTestDate } from '../../../Models/IMedicalTestDate';
import { ModalDonorTestDetails } from '../Modal/ModalDonorTestDetails';
import { IMedicalTestDetails } from '../../../Models/IMedicalTestDetails';

interface DonorProfileProps {

}

interface DonorProfileState {
    message: string,
    nextDate: Date,
    donorPastTests: IMedicalTestDate[],
    showDetails: boolean,
    currentTest:IMedicalTestDetails
}

export class DonorTestsPage extends React.Component<DonorProfileProps, DonorProfileState> {

    constructor(props: DonorProfileProps) {
        super(props);
        this.state = {
            message: '',
            nextDate: null,
            donorPastTests: [],
            showDetails: false,
            currentTest:null
        }
        this.closeDetails=this.closeDetails.bind(this);

    }
    closeDetails(){
        this.setState({showDetails:false});
    }

    onSelectRow(row){
        
        DonorService.getMedicalAnalysesById(row.id).then((analyse:IMedicalTestDetails) => {
            this.setState({
                currentTest:analyse,
                showDetails:true
            });   
        },
            (error) => {
                Alert.error("A apărut o eroare la aducerea detalillor pentru analiza", {
                    position: 'top-right',
                    effect: 'jelly'
                  });
            });
    }
    
    componentDidMount() {
        
        DonorService.getAnalysesDate().then((donorPastTests: IMedicalTestDate[]) => {
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
       // console.log("next date: "+Date.parse(date));
        //console.log("now: "+Date.now());
        if (!date) {
            return true;
        }
        return false;
    }

    getDateComponent() {
        if (this.canDonate(this.state.nextDate)) {
            return(
                <h1>Puteți dona</h1>
            );
        }
        console.log(this.state.nextDate);
        return(
            <div id="days-remaining-container">
                <div id="days-remaining-div">
                    <h1 className="days-remaining">
                        <Days deadline={this.state.nextDate}/>
                        
                    </h1>
                </div>
                
                <div>
                    zile până când puteți dona din nou
                </div>
                <span className="date-text">{this.state.nextDate.toDateString()}</span>
            </div>
            
        );
    }

    render() {
        const options = {
            noDataText: "Nu exista analize medicale",
            onRowClick: this.onSelectRow.bind(this)
        }
        const selectRowProp = {
            clickToSelect: true,           
          };
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
                        selectRow={selectRowProp}
                        exportCSV>
                        <TableHeaderColumn width={100} dataField="id" isKey={true}>Nr</TableHeaderColumn>
                        <TableHeaderColumn dataField="date">Data analizei</TableHeaderColumn>
                    </BootstrapTable>
                    {this.state.showDetails?<ModalDonorTestDetails currentTest={this.state.currentTest} onClose={this.closeDetails}/>:null}
                </div>            
            </div>
        );
    }
}