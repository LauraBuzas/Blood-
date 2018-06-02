import * as React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet'
import './patients.css';
import { DoctorService } from '../../../Services/DoctorService';
import Cookies from 'universal-cookie';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import { IPatientGet } from '../../../Models/IPatientGet';
import { Button1 } from '../../../utils/Button1';
import { IPatientStatusChange } from '../../../Models/IPatientStatusChange';

export interface DoctorPatientsProps{
}
interface DoctorPatientsState
{
    patients:IPatientGet[],
    message:string,
    currentRow:IPatientGet

}



export class DoctorPatients extends React.Component<DoctorPatientsProps,DoctorPatientsState>
{

    constructor(props: DoctorPatientsProps) {
       
        super(props);

        this.state = 
        {
            message:'',
            patients:[],
            currentRow:undefined
        };
    }

    componentDidMount() {

        this.getPatients();
        //alert(this.state.patients[1].id);
    
    }

    getPatients(){
        DoctorService.getHospitalizedPatientsDetailed().then((patients:IPatientGet[]) => {
            this.setState({
                patients:patients
            });    
        },
            (error) => {
                this.setState({
                    message: "A apărut o eroare la aducerea datelor despre pacienti"
                    
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
            });
    }


    /*handleAddRowWithASyncError = (row, colInfo, errorCallback) => {
       

        
        DoctorService.addPatient(row).then((patient:IPatientGet) => {
            let newPatients:IPatientGet[];
            newPatients=this.state.patients;
            newPatients.push(patient);
            this.setState({
                patients:newPatients
            });
        },
            (error) => {
                this.setState({
                    message: "A apărut o eroare la adăugarea pacientului"
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
                errorCallback(this.state.message);

            });
          
        
    }*/
    

    

    cellEditProp = {
        mode: 'click',
        blurToSave: true
      };
    
    
    changeStatus(cnpC,statusC){
        //alert("schimba la"+cnpC+" "+statusC);
        let patientChange:IPatientStatusChange = {
            cnp:cnpC,
            status:statusC
        }

        DoctorService.changePatientStatus(patientChange).then((patients:IPatientGet[])=>{
            this.setState({
                patients:patients
            });
            Alert.success("S-a modificat statusul in "+statusC, {
                position: 'top-right',
                effect: 'jelly'
              });
        },
        (error) => {
            this.setState({
                message: "A apărut o eroare la aducerea datelor despre pacienti"
                
            });
            Alert.error(this.state.message, {
                position: 'top-right',
                effect: 'jelly'
              });
        });
        
    }


    selectStatus(cell,row){
    
        
        if(row.status == "INTERNAT")
            return <select className="select-status"  onChange={(ev)=>{this.changeStatus(row.cnp,ev.currentTarget.value)}}>
                        <option>INTERNAT</option>
                        <option>EXTERNAT</option>
                        <option>DECEDAT</option>
                    </select>
        else if(row.status == "EXTERNAT")
            return <select className="select-status"  onChange={(ev)=>{this.changeStatus(row.cnp,ev.currentTarget.value)}}>
                        <option>EXTERNAT</option>
                        <option>INTERNAT</option>
                        <option>DECEDAT</option>
                    </select>
        else 
            return <select className="select-status"  onChange={(ev)=>{this.changeStatus(row.cnp,ev.currentTarget.value)}}>
            <option>DECEDAT</option>
            <option>EXTERNAT</option>
            <option>INTERNAT</option>
        
            
    </select>
    }

    render()
    {
        const option = {
              
            //handleConfirmDeleteRow:this.handleConfirmDelete,
            //onDeleteRow:this.handleDeleteRow
            
          };

       
          
        return(
            
            <div className="patients-table-area">
                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                </Helmet>


                <BootstrapTable data={ this.state.patients} 
                                stripped={true}
                                hover={true}
                                search={ true }
                                options={option}
                                cellEdit = {this.cellEditProp}
                                >
                <TableHeaderColumn width={30} dataField='id' editable={false}>Id</TableHeaderColumn>
                <TableHeaderColumn width={120} dataField='lastname' editable={false}>Nume</TableHeaderColumn>
                <TableHeaderColumn width={120} dataField='firstname' editable={false}>Prenume</TableHeaderColumn>
                <TableHeaderColumn width={160} dataField='cnp' isKey={true} editable={false}>CNP</TableHeaderColumn>
                <TableHeaderColumn width={130} dataField='city' editable={false}>Oras</TableHeaderColumn>
                <TableHeaderColumn width={100} dataField='county' editable={false}>Judet</TableHeaderColumn>
                <TableHeaderColumn width={140} dataField='street' editable={false}>Strada</TableHeaderColumn>
                <TableHeaderColumn width={50} dataField='floor'editable={false}>Etaj</TableHeaderColumn>
                {/* <TableHeaderColumn dataField='status'editable={false}>Status</TableHeaderColumn> */}
                <TableHeaderColumn width={120} dataField='select' editable={false} dataFormat = {this.selectStatus.bind(this)}>Schimba status</TableHeaderColumn>
                </BootstrapTable>
        
               <Alert stack={true} timeout={3000} />
               
                        
            </div>
            
        );
    }

}


