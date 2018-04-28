import axios from 'axios';
import { IEmployeeGet } from '../Models/IEmployeeGet';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
import { IEmployeeDelete } from '../Models/IEmployeeDelete';

export class CenterAdminService {
    private static rootEmployees: string = 'http://localhost:50272/employees';
    private static rootRegisterEmployees: string = 'http://localhost:50272/account/register/employee';


    public static getEmployees(): Promise<IEmployeeGet[]> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployees,
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                let employees = response.data.map(this.toEmployee);
                resolve(employees);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }
    public static addEmployee(employee:IEmployeeGet): Promise<IEmployeeGet> {
        const cookies = new Cookies();
        employee.centerId=cookies.get("CenterId");
        employee.confirmPassword=employee.password;

        return new Promise((resolve, reject) => {
            axios(
                this.rootRegisterEmployees,
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:employee
                }
            ).then((response: any) => {
                let employee = this.toEmployee(response.data);
                resolve(employee);
            },
                (error: any) => {
                    reject(error);
                });
        });



        // return new Promise((resolve, reject) => {
        //     axios.post(this.rootRegisterEmployees,employee,{withCredentials:true}).then((response: any) => {
        //         let employee = this.toEmployee(response.data);
        //         resolve(employee);
        //     },
        //         (error: any) => {
        //             reject(error);
        //         })
        // });
    }

    public static deleteEmployee(employee:IEmployeeDelete):Promise<any>
    {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployees,
                {
                    method:'DELETE',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true,
                    data:employee
                }
            ).then((response: any) => {
                
            },
                (error: any) => {
                    reject(error);
                })
        });

    }

    private static toEmployee(response: any): IEmployeeGet {
        return {
            lastname:response.lastName,
            firstname:response.firstName,
            email:response.email,
            password:response.password,
            confirmPassword:response.password
        };
    }
}