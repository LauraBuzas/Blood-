import axios from 'axios';
import { IEmployeeGet } from '../Models/IEmployeeGet';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
import { IEmployeeDelete } from '../Models/IEmployeeDelete';

export class EmployeeProfileService {
    private static rootEmployeeProfile: string = 'http://localhost:50272/employee/profile';
   
    
    public static getEmployee(): Promise<IEmployeeGet> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployeeProfile+"/employee",
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
               // let employee = response.data.map(this.toEmployee);
                let employee={
                    lastname:response.data.lastName,
                    firstname:response.data.firstName,
                    email:response.data.email,
                    password:response.data.password,
                    confirmPassword:response.data.password,
                    centerId:response.data.centerId
                }
                resolve(employee);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }
    
    private static toEmployee(response: any): IEmployeeGet {
        return {
            lastname:response.lastName,
            firstname:response.firstName,
            email:response.email,
            password:response.password,
            confirmPassword:response.password,
            centerId:response.centerId
        };
    }

    public static getCenterName():Promise<string>{
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployeeProfile+"/name" , //+"/ceva" aici?
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                let centerName = response.data;
                
                resolve(centerName);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }
}