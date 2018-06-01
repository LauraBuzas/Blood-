import axios from 'axios';
import {Config} from './UrlConfig';
import { IDonorInfoGet } from '../Models/IDonorInfoGet';

export class DonorsPersonalDataService{
    private static rootDonors: string = Config.url+'/employees';

    public static getDonors():Promise<IDonorInfoGet[]>{
        return new Promise((resolve,reject) =>{
        axios(
            this.rootDonors+'/donors-info',{
                method:'GET',
                headers:{
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json'
                },
                withCredentials:true
            }
        ).then((response:any)=>{
            let donors=response.data.map(this.toDonor);
            resolve(donors);
        },
        (error:any)=>{
            reject(error);
        });
    });
    }
    public static toDonor(response:any):IDonorInfoGet{
        return{
            firstname:response.firstName,
            lastname:response.lastName,
            cnp:response.cnp,
            city:response.city,
            county:response.county,
            street:response.street,
            number:response.number
        };
    }
}