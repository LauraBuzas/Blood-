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
                    message: "A apărut o eroare la aducerea datelor despre doctori"
                    
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
                    message: "A apărut o eroare la adăugarea doctorului"
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
                    message: "A apărut o eroare la ștergerea doctorului"
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
            title: 'Confirmă ștergerea',
            message: 'Ești sigur că vrei să ștergi doctorul cu email-ul '+dropRowKeysStr+' ?',
            buttons: [
              {
                label: 'Da',
                onClick: () => next()
              },
              {
                label: 'Nu',
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
                {/* <Helmet>
                    <meta charSet="utf-8" />
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" type="text/css"/>
                </Helmet> */}
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
                <TableHeaderColumn dataField='firstname'>Prenume</TableHeaderColumn>
                <TableHeaderColumn dataField='lastname'>Nume</TableHeaderColumn>
                <TableHeaderColumn dataField='speciality'>Specializare</TableHeaderColumn>
                <TableHeaderColumn dataField='ward'>Secție</TableHeaderColumn>
                <TableHeaderColumn dataField='email' isKey={true}>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='password'>Parolă</TableHeaderColumn>
                </BootstrapTable>
        
               <Alert stack={true} timeout={3000} />
               
                        
            </div>
        );
    }

}