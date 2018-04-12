import * as React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet'
import '../HospitalAdmin/HospitalAdmin.css'
import '../../css/Management.css'
import { CenterAdminService } from '../../Services/CenterAdminService';
import Cookies from 'universal-cookie';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import { IEmployeeGet } from '../../Models/IEmployeeGet';
import { IEmployeeDelete } from '../../Models/IEmployeeDelete';



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
                    message: "Error getting employees"
                    
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
                    message: "Error adding employee"
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
                    message: "Error deleting employee"
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
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete employee with email '+dropRowKeysStr+' ?',
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
                <TableHeaderColumn dataField='firstname'>First Name</TableHeaderColumn>
                <TableHeaderColumn dataField='lastname'>Last name</TableHeaderColumn>
                <TableHeaderColumn dataField='email' isKey={true}>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='password'>Password</TableHeaderColumn>
                </BootstrapTable>
        
               <Alert stack={true} timeout={3000} />
               
                        
            </div>
        );
    }

}