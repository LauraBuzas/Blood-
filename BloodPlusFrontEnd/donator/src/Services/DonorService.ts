import axios from 'axios';
import Cookies from 'universal-cookie';
import { IDonorTestGet } from '../Models/IDonorTestGet';
import { IMedicalTestDate } from '../Models/IMedicalTestDate';
import { IMedicalTestDetails } from '../Models/IMedicalTestDetails';
import {IDonorRegisterForDonation} from '../Models/IDonorRegisterForDonation';
import { Config } from './UrlConfig';
import {IDonorRegistrationData} from '../Models/IDonorRegistrationData'
import { IDonorContact } from '../Models/IDonorContact';
import { IDonorRegistrationForDonation } from '../Models/IDonorRegistrationForDonation';
import { parse } from 'url';
var dateformat=require('dateformat');
export class DonorService {

    private static rootDonors: string = Config.url + '/donors';


    public static getNextDonation(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootDonors+'/nextDonation',
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                       
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                //console.log(response);
                
                resolve(DonorService.mapNextDate(response.data));
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

  /*  public static addRegistration(name: IDonorRegisterForDonation ): Promise<any> {

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

*/

public static addRegistration(formdata: IDonorRegistrationForDonation ): Promise<any> {

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
                data:formdata
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
    public static getDonorData(): Promise<IDonorRegistrationData> {
        return new Promise((resolve, reject) => {
            //var doctorId=cookies.get("DoctorId");
            axios(
                this.rootDonors+"/donordata",
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        Cookies:'UserId'
                    },
                    withCredentials:true,
                }
            ).then((response: any) => {
                //let doctor = response.data.map(this.toDoctor);
                let dataofb:string=response.data.dob.toString();
                let datas:string[]=dataofb.split('-');
                let year:number=parseInt(datas[0]);
                let month:number=parseInt(datas[1]);
                let day:number=parseInt(datas[2].slice(0,2));
                console.log("data nasterii: "+dataofb);
                let db:Date=new Date(year,month,day,0,0,0,0);
                console.log(db.getDate()+" "+db.getFullYear()+" "+db.getMonth())
               // db=new Date(response.data.dob);
                db=dateformat(db,'isoDate');
                console.log(db);
               let donord:IDonorRegistrationData={
                    name:response.data.name,
                    surname:response.data.surname,
                    dob:db,
                    cnp:response.data.cnp,
                    cityD:response.data.cityD,
                    countyD:response.data.countyD,
                    cityR:response.data.cityR,
                    countyR:response.data.countyR,
                    

                   
                }
                resolve(donord);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static getDonorContact(): Promise<IDonorContact> {
        return new Promise((resolve, reject) => {
            //var doctorId=cookies.get("DoctorId");
            axios(
                this.rootDonors+"/donorcontact",
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        Cookies:'UserId'
                    },
                    withCredentials:true,
                }
            ).then((response: any) => {
                let contactinfo:IDonorContact={
                    email:response.data.email,
                    phone:response.data.phone

                   
                }
                resolve(contactinfo);
              
                resolve(response);
            },
                (error: any) => {
                    reject(error);
                });
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

    public static getAnalysesDate(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootDonors+'/analyses-date',
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
                let analyses = response.data.map(this.toAnalysesDate);
                resolve(analyses);
            }, (error: any) => {
                reject(error);
            });
        });
    }

    public static getMedicalAnalysesById(id:number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootDonors+'/analyses/'+id,
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
                let analyse = this.toAnalysesDetails(response.data);
                resolve(analyse);
            }, (error: any) => {
                reject(error);
            });
        });
    }


    private static toAnalysesDate(response:any):IMedicalTestDate{
        return{
            id:response.id,
            date:response.date
        };
    }

    private static toAnalysesDetails(response:any):IMedicalTestDetails{
        return{
            altLevel:this.DaNu(response.altLevel),
            hepatitisB:this.DaNu(response.hepatitisB),
            hepatitisC:this.DaNu(response.hepatitisC),
            hiv:this.DaNu(response.hiv),
            HTLV:this.DaNu(response.htlv),
            Sifilis:this.DaNu(response.sifilis),
            date:this.GetDate(response.dateAndTime),
            rejectedOtherCauses:this.DaNu(response.rejectedOtherCauses),
            observations:this.GetObservations(response.observations)
        };
    }

    public static DaNu(data)
    {
        if(data)
            return "Da"
        return "Nu"
    }
    public static GetObservations(data)
    {
        if(data=="" || data==null)
            return "Nicio observatie"
        return data;
    }
    public static GetDate(data)
    {
        if(data==null)
            return "Data nu e setată";
        else return data.toString();
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