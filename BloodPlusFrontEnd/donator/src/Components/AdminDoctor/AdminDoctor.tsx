import * as React from 'react'
import { IDoctorGet } from '../../Models/IDoctorGet';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Helmet} from 'react-helmet'
import './AdminDoctor.css'
import { AdminDoctorService } from '../../Services/AdminDoctorService';
import Cookies from 'universal-cookie';

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
        
       
        const cookies = new Cookies();
        cookies.set('.AspNetCore.Identity.Application',
         'CfDJ8Om1XNJeLMtJh84tqTlDYqJPcxaONZmAJNdAEo0NnZHSniordwAE7ksU7vVASacN6TPHJvyQDlrKUi66JiOf3c6a-YoE057bBu7qLhzCUsouLziGX69HOxPHtSTvltZnMoC31UwBEGYlEBdDmw7zLxvLw5yT4CKgmLqpT_oZy3j7vuWwhZEuL8DFbBgq5z3YaLa0a9GEHbaYyWQqzjX6EFY1MjW4mbCEDmXRWPph2vs-MBvW5G3l4lSXey25332bmf5jN_iAOHKakO7xpDtSuiAaR-j_hFga7Zf8Js6sgpjVnTjy5itAimMx4k2bDIqCcnRGC3WAzZjuzl5LdFBnnaWhxTNCJIeMfsxhyJWCGzp6VOWbjmctev3TPaznrHXajH4O1MjwzsM-gL7G8GlmXeM2LrJHVh6GiuE98_EKV9x25BqE1LZ1pPHtvltuuskiGuRm46H-Utpd7k3U6w-_TOVzzCV_A5-Fz4Z2kP3Nkvu527-9xwMuwNJKRxNMbnUFbnZcOD6-LBK3l2zYM8Rs0yDwWoOUJAdUjY3R1ydpgFQOjswYXbMWvqlkHTQYDJrZUYuNr5KKOfoHOPafnNZEgr-waTWlq6TppBuLJrx9IKz3eYGFgbcIrgde5KJXIMnpj2StzjHIHLVW9WHQXshkq7Y4wZb2wx-7KHCHEeOsnNjHkEVl4tKTAHDoFG2Eg8u-EmTrK7q1zLVyuhM9pQfTdVw', 
         { path: '/' });
         cookies.set('HospitalId','1', 
         { path: '/' });

       
        AdminDoctorService.getDoctors().then((doctors:IDoctorGet[]) => {
            this.setState({
                doctors: doctors
            });    
        },
            (error) => {
                this.setState({
                    message: "Error getting doctors"
                });
            });
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
        // let doctors:IDoctorGet[];
        // doctors=[];
        // var d2:IDoctorGet={
        //     email:row.email,
        //     firstname:row.firstname,
        //     lastname:row.lastname,
        //     password:row.password}
        // if(2==2)
        //     {
                
        //     }
        // else
        // {
        // doctors.push(d2);
        // this.setState({
        //     doctors:doctors
        // })}
        AdminDoctorService.addDoctor(row).then((doctor:IDoctorGet) => {
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
                errorCallback(this.state.message);
            });
          
        
    }
      onSelectRow = {
        mode: 'checkbox',
        // clickToSelect: true,
        // onSelect: this.onRowSelect,
    };

    render()
    {
        const option = {
            onAddRow: this.handleAddRowWithASyncError     
          };
        return(
            <div>
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

            </div>
        );
    }

}