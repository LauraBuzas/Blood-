import axios from 'axios';
import { IEmployeeGet } from '../Models/IEmployeeGet';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
import { IEmployeeDelete } from '../Models/IEmployeeDelete';
import { IEmployeeProfile } from '../Models/IEmployeeProfile';
import { BloodStockModel } from '../Models/BloodStockModel';
import { IAddBloodBag } from '../Models/IAddBloodBag';
import { IStatusChange } from '../Models/IStatusChange';
import { IEditBloodBag } from '../Models/IEditBloodBag';

export class EmployeeService {
    private static rootEmployee: string = 'http://localhost:57738/employees';
    
    public static getBloodStock(): Promise<BloodStockModel[]> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee + '/stock',
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        Cookies: "CenterId"
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                //console.log(response);
                let bloodStock=response.data.map(this.toBloodStockModel);
                resolve(bloodStock);
                //resolve(EmployeeService.mapBloodStock(response.data));
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

   
    public static toBloodStockModel(response:any):BloodStockModel{
        return{
            type:response.type,
            group:response.group,
            rh:response.rh,
            donor:response.donor,
            cnp:response.cnp,
            date:response.date,
            status:response.status
        };
    }

    public static mapBloodStock(data: any): BloodStockModel[] {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            result.push({
                type: data.Type,
                group: data.Group,
                rh: data.Rh,
                donor: data.Donor,
                date: data.Date,
                status: data.Stage
            })
        }
        return result;
    }


    public static addBloodBag(bloodBag:IAddBloodBag): Promise<any> {

        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee+'/blood-bag',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:bloodBag
                }
            ).then((response: any) => {
                resolve(response);
            },
                (error: any) => {
                    reject(error);
                });
        });
  
 
    }
    public static changeStatus(status:IStatusChange):Promise<BloodStockModel[]>{
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee+'/status',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:status
                }
            ).then((response: any) => {
                let bloodStock=response.data.map(this.toBloodStockModel);
                resolve(bloodStock);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static changeStatusRejected(status:IStatusChange):Promise<BloodStockModel[]>{
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee+'/statusReject',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:status
                }
            ).then((response: any) => {
                let bloodStock=response.data.map(this.toBloodStockModel);
                resolve(bloodStock);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static separateBloodBag(status:IStatusChange):Promise<BloodStockModel[]>{
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee+'/separate',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:status
                }
            ).then((response: any) => {
                let bloodStock=response.data.map(this.toBloodStockModel);
                resolve(bloodStock);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static updateBloodBag(edit:IEditBloodBag):Promise<BloodStockModel[]>{
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee+'/update',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:edit
                }
            ).then((response: any) => {
                let bloodStock=response.data.map(this.toBloodStockModel);
                resolve(bloodStock);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }
}