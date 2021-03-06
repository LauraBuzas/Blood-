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
import {ModalInfoBloodBag} from '../Modal/ModalInfoBloodBag';
import { IDonorBloodBagView } from '../../../Models/IDonorBloodBagView';

import Divider from 'material-ui/Divider';

interface BloodStockProps{}
interface BloodStockState {
    bloodStock: BloodStockModel[],
    addBloodBag:boolean,
    showDetails: boolean,
    currentRow: IDonorBloodBagView
    
}

export class CenterBloodStock extends React.Component<BloodStockProps, BloodStockState> {
    constructor(props: BloodStockProps) {
        super(props);
        this.state = {
            bloodStock: [],
            addBloodBag:false,
            showDetails:false,
            currentRow:undefined
        }
        this.addBloodBag=this.addBloodBag.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentDidMount(){
        EmployeeService.getBloodStock().then((bloodBags:BloodStockModel[])=>{
            this.setState({
                bloodStock:bloodBags
            });
        });
    }
    closeDetails(){
        this.setState({addBloodBag:false});
    }
    

    requestBlood(event: any) {
        event.preventDefault();
        
        EmployeeService.notifyDonors().then((resp) => {
            Alert.success("Donatorii au fost notificati.",{
                position: 'top-right',
                effect: 'jelly'
              });

        },
            (error) => {
                Alert.error("Nu s-a putut trimite e-mail donatorilor. Vă rugăm,reîncercați.", {
                    position: 'top-right',
                    effect: 'jelly'
                  });
            });
        return false;
    }

    closeModal(){
        this.setState({addBloodBag:false});
    }
    
    separateBloodBag(row){
        if(row.status=="Accepted"){
            let separate = {
                cnp : row.cnp,
                date: row.date,
                status: row.status
            }
            EmployeeService.separateBloodBag(separate).then((bloodBags:BloodStockModel[])=>{
                // let newBloodBags:BloodStockModel[];

                // newBloodBags=this.state.bloodStock;
                // for(let i=0;i<bloodBags.length;i++)
                //     newBloodBags.push(bloodBags[i]);
                // newBloodBags = newBloodBags.filter(obj => obj != row)
                this.setState({
                    bloodStock:bloodBags
                });
            },
            (error) => {
                Alert.error( "A apărut o eroare la adăugarea pungii", {
                    position: 'top-right',
                    effect: 'jelly'
                });
            });
        }else{
            Alert.error( "Punga nu poate fi separată(status->waiting)!", {
                position: 'top-right',
                effect: 'jelly'
            });
        }
    }
    changeStatus(row){
        let separate = {
            cnp : row.cnp,
            date: row.date,
            status: row.status
        }
        EmployeeService.changeStatus(separate).then((bloodBags:BloodStockModel[])=>{
            // if(row.status=='Waiting')
            //     row.status='Accepted'
            // else if(row.status=='Accepted')
            //     row.status='Destroyed'
            this.setState({
                bloodStock:bloodBags
            });
        },
        (error) => {
            Alert.error( "A apărut o eroare la adăugarea pungii", {
                position: 'top-right',
                effect: 'jelly'
              });
        });
        
    }
    changeStatusReject(row){
        let separate = {
            cnp : row.cnp,
            date: row.date,
            status: row.status
        }
        EmployeeService.changeStatusRejected(separate).then((bloodBags:BloodStockModel[])=>{
            // if(row.status=='Waiting')
            //     row.status='Accepted'
            // else if(row.status=='Accepted')
            //     row.status='Destroyed'
            this.setState({
                bloodStock:bloodBags
            });
        },
        (error) => {
            Alert.error( "A apărut o eroare la adăugarea pungii", {
                position: 'top-right',
                effect: 'jelly'
              });
        });
    }
    addBloodBag(event)
    {
        this.setState({addBloodBag:true});
    }
    buttonFormatter(cell,row){
        if(row.type=="Punga de sange" && row.status!="Accepted"){
            return <div>
                    <button className="accept-btn" onClick = {() => {this.changeStatus(row)}}>
                    <i className="fa fa-check-square"></i>
                    </button> 
                    <button className="reject-btn" onClick = {() =>{this.changeStatusReject(row)}}>
                    <i className="fa fa-times-circle"></i>
                    </button>
                </div>;
        }
        else if(row.type=="Punga de sange" && row.status=="Accepted")
            return <button className="reject-btn" onClick = {() =>{this.changeStatusReject(row)}}>
            <i className="fa fa-times-circle"></i>
            </button>
        return null;
    }
    buttonSeparation(cell,row){
        if(row.type=="Punga de sange")
            return <button className="separation-btn" onClick = {() => {this.separateBloodBag(row)}}>
                <i className="fa fa-heartbeat"></i>
            </button>
        return null;
    }
    buttonCancel(cell,row){
        return <button className="buttonCancel">Anulează</button>
    }
    onAfterSaveCell(row){
        if(row.type=="Plasma"){
            Alert.error( "Plasma nu are Rh!", {
                position: 'top-right',
                effect: 'jelly'
            });
        }
        else if(row.rh=="POZITIV" || row.rh=="NEGATIV"){
            if(row.group=="O1" || row.group=="A2" || row.group=="B3" || row.group=="AB4"){
                let edit = {
                    cnp: row.cnp,
                    date: row.date,
                    bloodType: row.group,
                    rh: row.rh
                }
                EmployeeService.updateBloodBag(edit).then((bloodBags:BloodStockModel[])=>{
                    this.setState({
                        bloodStock:bloodBags
                    });
                },
                (error) => {
                    Alert.error( "A apărut o eroare la adăugarea pungii", {
                        position: 'top-right',
                        effect: 'jelly'
                    });
                });
            }
            else{
                Alert.error( "Grupa trebuie sa fie una dintre: O1,A2,B3,AB4!", {
                    position: 'top-right',
                    effect: 'jelly'
                });
            }
        }
        else{
            Alert.error( "Rh-ul trebuie sa fie unul dintre: POZITIV,NEGATIV!", {
                position: 'top-right',
                effect: 'jelly'
            });
        }
    }

    onSelectRow(row){
        //var currentRequest=this.state.bloodStock.findIndex(r=>r.cnp==row.cnp);
        //this.setState({currentRow:this.state.requests[currentRequest],showDetails:true});
        let bloodBagsTable =[];
        for(var i=0;i<this.state.bloodStock.length;i++){
            if(this.state.bloodStock[i].cnp==row.cnp)
            {
                bloodBagsTable.push(this.state.bloodStock[i]);
            }
        }
        let donorDetails:IDonorBloodBagView={
            CNP:row.cnp,
            fullName:row.donor,
            bloodType:row.group,
            rh:row.rh,
            bloodBags:bloodBagsTable
        }
        this.setState({currentRow:donorDetails,showDetails:true});
    }
    closeDetailsInfo(){
        this.setState({showDetails:false});
    }
    onAdd(){
        this.closeModal();
        EmployeeService.getBloodStock().then((bloodBags:BloodStockModel[])=>{
            this.setState({
                bloodStock:bloodBags
            });
        });
    }
    render() {
        const options = {
            noDataText: "Nu exista pungi de sange pe stoc",
            onRowDoubleClick: this.onSelectRow.bind(this)
        }
        const cellEditProp={
            mode: 'click',
            blurToSave: true,
            afterSaveCell:this.onAfterSaveCell.bind(this)
        }
        const selectRowProp = {
            clickToSelect: true,           
          };
          

        return(
            <div id="stock-table">

                {this.state.addBloodBag?<ModalAddBloodBag onAdd={this.onAdd} onClose={()=>this.closeModal()}/>:null}  
                <button className="generic-button stock-btn" onClick={(event) => this.addBloodBag(event)} >Adaugă pungă de sânge</button>
                <button className="generic-button stock-btn" onClick={(event) => this.requestBlood(event)}>Cere sânge donatorilor</button>               
                
                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                </Helmet>
                <BootstrapTable
                    className="stock-table"
                    data={this.state.bloodStock}
                    striped
                    hover
                    search
                    options={options}
                    exportCSV
                    cellEdit={cellEditProp}
                    //width={600}
                >
                
                    <TableHeaderColumn width={160} dataField="type" editable={false}>Tip</TableHeaderColumn>
                    <TableHeaderColumn width={90} dataField="group">Grupa</TableHeaderColumn>
                    <TableHeaderColumn width={90} dataField="rh">Rh</TableHeaderColumn>
                    <TableHeaderColumn width={180} dataField="donor" editable={false}>Donator</TableHeaderColumn>
                    <TableHeaderColumn width={140} dataField="cnp" editable={false}>CNP</TableHeaderColumn>
                    <TableHeaderColumn width={200} dataField="date" editable={false} isKey={true}>Data</TableHeaderColumn>
                    <TableHeaderColumn dataField="stage" width={130} editable={false}>Stadiu</TableHeaderColumn>
                    <TableHeaderColumn dataField="status" width={90} editable={false}>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" width={130} dataAlign={'center'} editable={false} dataFormat={this.buttonFormatter.bind(this)}>Schimbă status</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" width={70} dataAlign={'center'} editable={false} dataFormat={this.buttonSeparation.bind(this)}>Separă</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField="button" dataAlign={'center'} editable={false} dataFormat={this.buttonCancel.bind(this)}>Anulează</TableHeaderColumn> */}
                </BootstrapTable>
                {this.state.showDetails?<ModalInfoBloodBag row={this.state.currentRow} onClose={this.closeDetailsInfo.bind(this) }/>:null}
            </div>
        );
    }
}