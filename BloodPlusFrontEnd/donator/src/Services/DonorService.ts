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

    public static getAnalyses(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootDonors+'/analyses',
                {
                    method: 'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        Cookies: "UserId"
                    },
                    withCredentials:true,
                }
            ).then((response: any) => {
                //console.log(response.data);
                resolve(DonorService.mapAnalysesToModel(response.data));
            }, (error: any) => {
                reject(error);
            });
        });
    }

    

    public static mapNextDate(date: string) {
        if (date === "") {
            return null;
        }
        let year = parseInt(date.substring(0, 4));
        let month = parseInt(date.substring(5, 7));
        let day = parseInt(date.substring(8, 10));
        //console.log(year +".." + month + ".." + day);
        return new Date(year, month, day);
    }

    public static mapAnalysesToModel(data: any) {
        let result = [];
        data.forEach(element => {
            let date = element.dateAndTime.substring(0, 10); //only date
            //console.log("date is:" + date);
            let diseases = "";
            if (element.altLevel) {
                diseases += "ALT level ";
            }
            if (element.hepatitisB) {
                diseases += "Hepatitis B ";
            }
            if (element.hepatitisC) {
                diseases += "Hepatitis C ";
            }
            if (element.hiv) {
                diseases += "HIV ";
            }
            if (element.htlv) {
                diseases += "HTLV ";
            }
            if (element.sifilis) {
                diseases += "Sifilis";
            }
            if (element.rejectedOtherCauses) {
                diseases += "Other disease ";
            }
            result.push({
                date: date,
                results: (diseases + element.observations) ? "Rezultate bune" : (diseases + element.observations)
            });
        });
        return result;
    }
  
  
}