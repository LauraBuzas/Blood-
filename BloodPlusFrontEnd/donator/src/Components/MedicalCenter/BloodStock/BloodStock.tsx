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
            return <div><button className="buttonStatusAccept" onClick = {() => {this.changeStatus(row)}}>Acceptă</button> <button className="buttonStatusReject" onClick = {() =>{this.changeStatusReject(row)}}>Respinge</button></div>;
        }
        else if(row.type=="Punga de sange" && row.status=="Accepted")
            return <button className="buttonStatusReject" onClick = {() =>{this.changeStatusReject(row)}}>Respinge</button>
        return null;
    }
    buttonSeparation(cell,row){
        if(row.type=="Punga de sange")
            return <button className="buttonSeparation" onClick = {() => {this.separateBloodBag(row)}}>Separă</button>
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

                {this.state.addBloodBag?<ModalAddBloodBag onClose={()=>this.closeModal()} onAdd={this.onAdd.bind(this)}/>:null}  
                <button className="buttonAddBloodBag" onClick={(event) => this.addBloodBag(event)} >Adaugă pungă de sânge</button>
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
                    cellEdit={cellEditProp}
                    //width={600}
                >
                
                    <TableHeaderColumn dataField="type" editable={false} width={150}>Tip</TableHeaderColumn>
                    <TableHeaderColumn dataField="group">Grupa</TableHeaderColumn>
                    <TableHeaderColumn dataField="rh">Rh</TableHeaderColumn>
                    <TableHeaderColumn dataField="donor" editable={false} width={170}>Donator</TableHeaderColumn>
                    <TableHeaderColumn dataField = "cnp"  editable={false}>CNP</TableHeaderColumn>
                    <TableHeaderColumn dataField="date"  editable={false} isKey={true}>Data</TableHeaderColumn>
                    <TableHeaderColumn dataField="stage" width={130} editable={false}>Stadiu</TableHeaderColumn>
                    <TableHeaderColumn dataField="status" width={130} editable={false}>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" width={170} dataAlign={'center'} editable={false} dataFormat={this.buttonFormatter.bind(this)}>Schimbă status</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataAlign={'center'} editable={false} dataFormat={this.buttonSeparation.bind(this)}>Separă</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField="button" dataAlign={'center'} editable={false} dataFormat={this.buttonCancel.bind(this)}>Anulează</TableHeaderColumn> */}
                </BootstrapTable>
                {this.state.showDetails?<ModalInfoBloodBag row={this.state.currentRow} onClose={this.closeDetailsInfo.bind(this) }/>:null}
            </div>
        );
    }
}