import * as React from 'react';
import {DonorHistory} from '../CenterDonors/DonorHistory';
import { Redirect } from 'react-router-dom';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import {Helmet} from 'react-helmet';
import Alert from 'react-s-alert';
import { IDonorInfoGet } from '../../Models/IDonorInfoGet';
import { ModalDonorPersonalData } from './Modals/ModalDonorPersonalData';
import { DonorsPersonalDataService } from '../../Services/DonorsPersonalDataService';

export interface DonorsPersonalDataProps{
 
}
interface DonorsPersonalDataState{
    redirect:Boolean,
    donors:IDonorInfoGet[],
    showDetails:boolean,
    currentRow:IDonorInfoGet
}
export class DonorsPersonalData extends React.Component<DonorsPersonalDataProps,DonorsPersonalDataState>
{
    constructor(props:DonorsPersonalDataProps){
        super(props);
        this.state={
            redirect:false,
            donors:[],
            showDetails:false,
            currentRow:{
                firstname:'',
                lastname:'',
                cnp:'',
                city:'',
                county:'',
                street:'',
                number:0
            }
        }
    }
    componentDidMount(){
        DonorsPersonalDataService.getDonors().then((donors:IDonorInfoGet[])=>{
            this.setState({
                donors:donors
            });
        });
    }

    setRedirect=()=>{
        this.setState({
            redirect:true
        });
    }
    renderRedirect=(cnp:String)=>{
        if(this.state.redirect){
            return <Redirect to={"/employees/history/"+cnp}/>
        }
        else
            return <Redirect to="/employees/donors"/>
    }
    onSelectRow(row){
        let donorDetails:IDonorInfoGet={
            cnp:row.cnp,
            firstname:row.firstname,
            lastname:row.lastname,
            county:row.county,
            number:row.number,
            street:row.street,
            city:row.city
        }
        this.setState({currentRow:donorDetails,showDetails:true});
    }
    onSelectRow2(row){
        console.log(row);
        let donorDetails:IDonorInfoGet={
            cnp:row.cnp,
            firstname:row.firstname,
            lastname:row.lastname,
            county:row.county,
            number:row.number,
            street:row.street,
            city:row.city
        }
        this.setState({currentRow:donorDetails});
    }
    buttonHistory(cell,row){
        
        return <div>{this.renderRedirect(this.state.currentRow.cnp)}<button onClick={(event)=>this.setRedirect()}>Istoric</button></div>
    }
    closeDetailsInfo(){
        this.setState({showDetails:false})
    }
    render(){
        const options ={
            noDataText:"Nu exista donatori",
            onRowDoubleClick:this.onSelectRow.bind(this),
            onRowClick:this.onSelectRow2.bind(this)
        }
        return(
            <div id="stock-table">
               
                {/* <button onClick={(event)=>this.setRedirect()}>Click</button> */}
                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                </Helmet>
                <BootstrapTable
                    data={this.state.donors}
                    striped
                    hover
                    search
                    options={options}
                    exportCSV
                >
                <TableHeaderColumn dataField="cnp" width={130} isKey={true}>CNP</TableHeaderColumn>
                <TableHeaderColumn dataField="lastname">Nume</TableHeaderColumn>
                <TableHeaderColumn dataField="firstname">Prenume</TableHeaderColumn>
                <TableHeaderColumn dataField="button" dataAlign={'center'} dataFormat={this.buttonHistory.bind(this)}>Istoric donări</TableHeaderColumn>
                </BootstrapTable>
                {this.state.showDetails?<ModalDonorPersonalData row={this.state.currentRow} onClose={this.closeDetailsInfo.bind(this)}/>:null}
            </div>
        );
    }
}