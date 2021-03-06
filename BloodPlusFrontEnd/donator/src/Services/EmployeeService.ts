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
import { IAddMedicalTest } from '../Models/IAddMedicalTest';
import { IDonorView } from '../Models/IDonorView';
import { IDoctorRequestView } from '../Models/IDoctorRequestView';
import { IEmployeeRequest } from '../Models/IEmployeeRequest';
import { IGroupedStock } from '../Models/IGroupedStock';

import { Config } from './UrlConfig';

export class EmployeeService {
    private static rootEmployee: string = Config.url + '/employees';

    public static getRequests(): Promise<IEmployeeRequest[]> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee + '/requests',
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                let requests=response.data.map(this.toRequest);
                resolve(requests);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static getGroupedStock(): Promise<IGroupedStock[]> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee + '/grouped-stock',
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                let groupedStock=response.data.map(this.toGroupedStock);
                resolve(groupedStock);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static toRequest(response:any):IEmployeeRequest{
        return{
            quantityNeeded: response.quantityNeeded,
            emergencyLevel:  response.emergencyLevel,
            component: response.component,
            bloodType: response.bloodType,
            rh: response.rh,
            dateOfRequest: response.dateOfRequest,
            id:response.id
        };
    }

    public static toGroupedStock(response:any):IGroupedStock{
        return{
            quantity: response.quantity,
            component: response.component,
            bloodType: response.bloodType,
            rh: response.rh,
        };
    }

    public static acceptRequest(request:IEmployeeRequest): Promise<IEmployeeRequest> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee + '/accept',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                    },
                    withCredentials:true,
                    data:request
                }
            ).then((response: any) => {        
                resolve(response.data);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    
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

    public static notifyDonors(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee + '/notify',
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
                resolve(true);
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
            stage:response.stage,
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

    public static addAnalysis(analysis:IAddMedicalTest):Promise<any>{
        return new Promise((resolve,reject)=>{
            axios(
            this.rootEmployee+'/analysis',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:analysis
                }
            ).then((response: any) => {
                console.log(response);
                resolve(response);
            },
                (error: any) => {
                    reject(error.response);
                });
        });
    }

    public static getDonors(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee+'/donors',
                {
                    method: 'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true,
                }
            ).then((response: any) => {
                //console.log(response.data);
                resolve(EmployeeService.mapDonorsToModel(response.data));
            }, (error: any) => {
                reject(error);
            });
        });
    }

    private static mapDonorsToModel(response:any):IDonorView[]{
        let result = [];
        response.forEach(element => {
        result.push({
            cnp:element.cnp,
            firstname: element.firstName,
            lastname: element.lastName
        });
    });
        return result;
    }
}