import * as React from 'react'
import { IDoctorGet } from '../../Models/IDoctorGet';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet'
import './HospitalAdmin.css'
import '../../css/Management.css'
import { HospitalAdminService } from '../../Services/HospitalAdminService';
import Cookies from 'universal-cookie';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { IDoctorDelete } from '../../Models/IDoctorDelete';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';



export interface HospitalAdminProps{
}
interface HospitalAdminState
{
    doctors:IDoctorGet[]
    message:string;
}

export class HospitalAdmin extends React.Component<HospitalAdminProps,HospitalAdminState>
{

    constructor(props: HospitalAdminProps) {
       
        super(props);

        this.state = 
        {
            message:'',
            doctors:[]
        };
    }


    componentDidMount() {
        
    
       
        HospitalAdminService.getDoctors().then((doctors:IDoctorGet[]) => {
            this.setState({
                doctors: doctors
            });    
        },
            (error) => {
                this.setState({
                    message: "Error getting doctors"
                    
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
            });
    }
    handleAddRowWithASyncError = (row, colInfo, errorCallback) => {
       

        
        HospitalAdminService.addDoctor(row).then((doctor:IDoctorGet) => {
            let newDoctors:IDoctorGet[];
            newDoctors=this.state.doctors;
            newDoctors.push(doctor);
            this.setState({
                doctors: newDoctors
            });    
        },
            (error) => {
                this.setState({
                    message: "Error adding doctor"
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
                errorCallback(this.state.message);

            });
          
        
    }
    
    onSelectRow = {
        mode: 'checkbox',
        // clickToSelect: true,
        // onSelect: this.onRowSelect,
    };

    handleDeleteRow=(row)=>
    {
        let doctor:IDoctorDelete={email:row[0]}
        HospitalAdminService.deleteDoctor(doctor).then(() => {
            let newDoctors:IDoctorGet[];
            newDoctors = this.state.doctors.filter((d) => {
                return d.email !== row;
              });
            
            this.setState({
                doctors: newDoctors
            });    
        },
            (error) => {
                this.setState({
                    message: "Error deleting doctor"
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
               
            });         
    }

    

    handleConfirmDelete = (next, dropRowKeys) => {
        const dropRowKeysStr = dropRowKeys.join(',');
        console.log('aici')
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete doctor with email '+dropRowKeysStr+' ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => next()
              },
              {
                label: 'No',
                onClick: () => alert('Click No')
              }
            ]
          })

    }

    render()
    {
        const option = {
            onAddRow: this.handleAddRowWithASyncError,  
            handleConfirmDeleteRow:this.handleConfirmDelete,
            onDeleteRow:this.handleDeleteRow
            
          };

       
          
        return(
            <div className="tableArea">
                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                </Helmet>
                <BootstrapTable data={ this.state.doctors} 
                                stripped={true}
                                hover={true}
                                search={ true }
                                exportCSV={true}
                                insertRow={ true }
                                selectRow={this.onSelectRow}
                                deleteRow={true}
                                options={option}
                                >
                <TableHeaderColumn dataField='firstname'>First Name</TableHeaderColumn>
                <TableHeaderColumn dataField='lastname'>Last name</TableHeaderColumn>
                <TableHeaderColumn dataField='speciality'>Speciality</TableHeaderColumn>
                <TableHeaderColumn dataField='ward'>Ward</TableHeaderColumn>
                <TableHeaderColumn dataField='email' isKey={true}>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='password'>Password</TableHeaderColumn>
                </BootstrapTable>
        
               <Alert stack={true} timeout={3000} />
               
                        
            </div>
        );
    }

}