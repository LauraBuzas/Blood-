import * as React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet'
import '../../Doctor/HospitalAdmin/HospitalAdmin.css'
import '../../../css/Management.css'
import { CenterAdminService } from '../../../Services/CenterAdminService';
import Cookies from 'universal-cookie';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import { IEmployeeGet } from '../../../Models/IEmployeeGet';
import { IEmployeeDelete } from '../../../Models/IEmployeeDelete';



export interface CenterAdminProps{
}
interface CenterAdminState
{
    employees:IEmployeeGet[]
    message:string;
}

export class CenterAdmin extends React.Component<CenterAdminProps,CenterAdminState>
{

    constructor(props: CenterAdminProps) {
       
        super(props);

        this.state = 
        {
            message:'',
            employees:[]
        };
    }


    componentDidMount() {
        
        CenterAdminService.getEmployees().then((employees:IEmployeeGet[]) => {
            this.setState({
                employees: employees
            });    
        },
            (error) => {
                this.setState({
                    message: "A apărut o eroare la aducerea datelor despre angajați"
                    
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
            });
    }
    handleAddRowWithASyncError = (row, colInfo, errorCallback) => {
       

        
        CenterAdminService.addEmployee(row).then((employee:IEmployeeGet) => {
            let newEmployees:IEmployeeGet[];
            newEmployees=this.state.employees;
            newEmployees.push(employee);
            this.setState({
                employees: newEmployees
            });
        },
            (error) => {
                this.setState({
                    message: "A apărut o eroare la adăugarea angajatului"
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
        let employee:IEmployeeDelete={email:row[0]}
        CenterAdminService.deleteEmployee(employee).then(() => {
            let newEmployees:IEmployeeGet[];
            newEmployees = this.state.employees.filter((d) => {
                return d.email !== row;
              });
            
            this.setState({
                employees: newEmployees
            });    
        },
            (error) => {
                this.setState({
                    message: "A apărut o eroare la ștergerea angajatului"
                });
                Alert.error(this.state.message, {
                    position: 'top-right',
                    effect: 'jelly'
                  });
               
            });         
    }

    

    handleConfirmDelete = (next, dropRowKeys) => {
        const dropRowKeysStr = dropRowKeys.join(',');
       
        confirmAlert({
            title: 'Confirmă ștergerea',
            message: 'Ești sigur că vrei să ștergi angajatul cu  email-ul '+dropRowKeysStr+' ?',
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
                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                </Helmet>
                <BootstrapTable data={ this.state.employees} 
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
                <TableHeaderColumn dataField='email' isKey={true}>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='password'>Parolă</TableHeaderColumn>
                </BootstrapTable>
        
               <Alert stack={true} timeout={3000} />
               
                        
            </div>
        );
    }

}