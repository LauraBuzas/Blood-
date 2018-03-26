import * as React from 'react'
import { IDoctorGet } from '../../Models/IDoctorGet';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet'
import './AdminDoctor.css'

export interface AdminDoctorProps{

}
interface AdminDoctorState
{
    doctors:IDoctorGet[]
    message:string;
}

export class AdminDoctor extends React.Component<AdminDoctorProps,AdminDoctorState>
{

    constructor(props: AdminDoctorProps) {
       
        super(props);

        this.state = 
        {
            message:'',
            doctors:[]
        };
    }


    componentDidMount() {
        let doctors:IDoctorGet[];
        doctors=[];
        var d1:IDoctorGet={
        email:"email@assa.com",
        firstname:"sasdasd",
        lastname:"sadsda",
        password:"1221323"}
        var d2:IDoctorGet={
            email:"emaisasdl@assa.com",
            firstname:"bsasdasd",
            lastname:"sadsda",
            password:"1221323"}
        doctors.push(d1);
        doctors.push(d2);


        this.setState({
            doctors:doctors
        })
      
    }
    handleAddRowWithASyncError = (row, colInfo, errorCallback) => {
        // Use setTimeout to perform a async operation
        // setTimeout(() => {
        //   // Force to return an error message anyway.
        //   errorCallback('Sorry, There\'s some error happend');
        // }, 3000);
        // return false to tell react-bootstrap-table to handle this operation as async
        // react-bootstrap-table will wait errorCallback be called.
        // return false;
        let doctors:IDoctorGet[];
        doctors=[];
        var d2:IDoctorGet={
            email:row.email,
            firstname:row.firstname,
            lastname:row.lastname,
            password:row.password}
        if(2==2)
            {
                
            }
        else
        {
        doctors.push(d2);
        this.setState({
            doctors:doctors
        })
    }
        
      }

    render()
    {
        const option = {
            onAddRow: this.handleAddRowWithASyncError
            // onAddRow: this.handleAddRowWithSyncError
          };
        return(
            <div>
                {/* <table className="tableDoctors">

                </table> */}


                <Helmet>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
                    {/* <link rel="stylesheet" href="./dist/react-bootstrap-table.min.css"/>            */}
                </Helmet>
                <BootstrapTable data={ this.state.doctors} 
                                stripped={true}
                                hover={true}
                                search={ true }
                                exportCSV={true}
                                deleteRow={true}
                                insertRow={ true }
                                options={option}
                                >
                <TableHeaderColumn dataField='firstname'>First Name</TableHeaderColumn>
                <TableHeaderColumn dataField='lastname'>Last name</TableHeaderColumn>
                <TableHeaderColumn dataField='email' isKey={true}>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='password'>Password</TableHeaderColumn>
    
                </BootstrapTable>

            </div>
        );
    }

}