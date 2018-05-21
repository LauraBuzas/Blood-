import axios from 'axios';
import { IEmployeeGet } from '../Models/IEmployeeGet';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
import { IEmployeeDelete } from '../Models/IEmployeeDelete';
import { IEmployeeProfile } from '../Models/IEmployeeProfile';
import { BloodStockModel } from '../Models/BloodStockModel';
import { IAddBloodBag } from '../Models/IAddBloodBag';

export class EmployeeService {
    private static rootEmployee: string = 'http://localhost:50272/employees/';
    
    public static getBloodStock(): Promise<BloodStockModel[]> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployee + 'stock',
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
                console.log(response);
                
                resolve(EmployeeService.mapBloodStock(response.data));
            },
                (error: any) => {
                    reject(error);
                });
        });
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
                this.rootEmployee+'blood-bag',
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
}