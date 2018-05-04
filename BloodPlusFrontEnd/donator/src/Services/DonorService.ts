import axios from 'axios';


export class DonorService {
    private static rootDonors: string = 'http://localhost:50272/donors';

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
  
}