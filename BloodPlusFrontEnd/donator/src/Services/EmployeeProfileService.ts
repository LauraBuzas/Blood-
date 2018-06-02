import axios from 'axios';
import { IEmployeeGet } from '../Models/IEmployeeGet';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
import { IEmployeeDelete } from '../Models/IEmployeeDelete';
import { IEmployeeProfile } from '../Models/IEmployeeProfile';
import { IPasswordUpdate } from '../Models/IPasswordUpdate';

import { Config } from './UrlConfig';

export class EmployeeProfileService {
    private static rootEmployeeProfile: string = Config.url + '/employee/profile';
   
    
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

    public static saveProfileChanges(employee:IEmployeeGet): Promise<any> {
        // const cookies = new Cookies();
        // doctor.hospitalId=cookies.get("HospitalId");
        // doctor.confirmPassword=doctor.password;

        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployeeProfile + "/changes",
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

    }

    public static updatePassword(passwordUpdate:IPasswordUpdate):Promise<any>{
        return new Promise((resolve, reject) => {
            axios(
                "http://localhost:54211/manage/change",
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:passwordUpdate
                }
            ).then((response: any) => {
                resolve(response.data);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

}