import * as React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet';
import './blood-stock.css';
import {BloodStockModel} from '../../../Models/BloodStockModel';
import { TextField } from '../../../utils/TextField';
import Alert from 'react-s-alert';
import { EmployeeService } from '../../../Services/EmployeeService';
import { VBox, HBox } from 'react-stylesheet';
import { ModalAddBloodBag } from '../Modal/ModalAddBloodBag';

interface BloodStockProps{}
interface BloodStockState {
    bloodStock: BloodStockModel[],
    addBloodBag:boolean,
  
}

export class CenterBloodStock extends React.Component<BloodStockProps, BloodStockState> {
    constructor(props: BloodStockProps) {
        super(props);
        this.state = {
            bloodStock: [],
            addBloodBag:false
        }
    }

    closeDetails(){
        this.setState({addBloodBag:false});
    }
    

    requestBlood(event: any) {
        // event.preventDefault();
        
        // AccountService.loginUser(user).then((resp) => {
            

        // },
        //     (error) => {
        //         Alert.error("Nu s-a putut trimite e-mail donatorilor. Vă rugăm,reîncercați.", {
        //             position: 'top-right',
        //             effect: 'jelly'
        //           });
        //     });
    }

    closeModal(){
        this.setState({addBloodBag:false});
    }

    addBloodBag(event)
    {
        this.setState({addBloodBag:true});
    }
    render() {
        const options = {
            noDataText: "Nu exista pungi de sange pe stoc"
        }


        return(
            <div id="stock-table">

                {this.state.addBloodBag?<ModalAddBloodBag onClose={()=>this.closeModal()}/>:null}  
                <button className="buttonAddBloodBag" onClick={(event) => this.addBloodBag(event)}>Adaugă pungă de sânge</button>
                <button className="buttonRequestBlood" onClick={(event) => this.requestBlood(event)}>Cere sânge donatorilor</button>               
                
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