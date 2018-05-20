import axios from 'axios';
import { IDonorRegisterForDonation } from '../Models/IDonorRegisterForDonation';


export class DonorService {

    private static rootDonors: string = 'http://localhost:54211/donors';


    public static getNextDonation(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootDonors+'/nextDonation',
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                resolve(response);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static addRegistration(name: IDonorRegisterForDonation ): Promise<any> {

        return new Promise((resolve, reject) => {
            axios(
                this.rootDonors+'/registerForDonation',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:name
                }
            ).then((response: any) => {
                console.log(response);
                console.log(response.headers['set-cookie']);
                resolve(response);
                
            },
                (error: any) => {
                    reject(error);
                })
        });
    }
  
}