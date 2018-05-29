import axios from 'axios';
import { IPatient } from '../Models/IPatient';
import { IDoctorRequest } from '../Models/IDoctorRequest';
import { IDoctorRequestView } from '../Models/IDoctorRequestView';
import { IPatientGet } from '../Models/IPatientGet';
import { IPatientStatusChange } from '../Models/IPatientStatusChange';


export class DoctorService {

    private static rootDoctors: string = 'http://localhost:51401/doctors';


    public static getHospitalizedPatients(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootDoctors+'/hospitalized',
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                let patients = response.data.map(this.toPatientGet);
                resolve(patients);
              
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static getHospitalizedPatientsDetailed(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios(
                this.rootDoctors+'/hospitalized/details',
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                let patients = response.data.map(this.toPatientGetComplete);
                resolve(patients);
              
            },
                (error: any) => {
                    reject(error);
                });
        });
    }


    public static getRequests(): Promise<any>{
        return new Promise((resolve,reject) =>{
            axios(
                this.rootDoctors+'/requests',
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                let requests = response.data.map(this.toRequestGet);
                resolve(requests);
              
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static addRequest(request:IDoctorRequest): Promise<any> {


        return new Promise((resolve, reject) => {
            axios(
                this.rootDoctors+'/addRequest',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:request
                }
            ).then((response: any) => {
                resolve(response);
            },
                (error: any) => {
                    reject(error);
                });
        });
  
 
    }

    // public static addPatient(patient:IPatientGet): Promise<any> {
    //     /*const cookies = new Cookies();
    //     employee.centerId=cookies.get("CenterId");
    //     employee.confirmPassword=employee.password;*/
    //     //patient.cnp = patient.cnp;

    //     return new Promise((resolve, reject) => {
    //         axios(
    //             this.rootDoctors+'/addPatient',
    //             {
    //                 method:'POST',
    //                 headers:{
    //                     'Access-Control-Allow-Origin':'*',
    //                     'Content-Type':'application/json',
    //                     'Access-Control-Allow-Credentials':true
    //                 },
    //                 withCredentials:true,
    //                 maxRedirects:0,
    //                 data:patient
    //             }
    //         ).then((response: any) => {
    //             //let patient = this.toPatientGet(response.data);
    //             resolve(patient);
    //         },
    //             (error: any) => {
    //                 reject(error);
    //             });
    //     });
    // }

    public static changePatientStatus(changePatient:IPatientStatusChange):Promise<any>{
        return new Promise((resolve,reject)=>
    {
        axios(
            this.rootDoctors+'/changePatientStatus',
            {
                method:'POST',
                headers:{
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Credentials':true
                },
                withCredentials:true,
                maxRedirects:0,
                data:changePatient
            }
        ).then((response: any) => {
            //let patient = this.toPatientGet(response.data);
            let patients = response.data.map(this.toPatientGetComplete);
            resolve(patients);
        },
            (error: any) => {
                reject(error);
            });
    });

    }

    private static toPatientGet(response:any):IPatient{
        return{
            fullname:response.fullName,
            CNP:response.cnp
        };
    }

    private static toPatientGetComplete(response: any): IPatientGet {
        return {
            id:response.id,
            cnp:response.cnp,
            lastname:response.lastName,
            firstname:response.firstName,
            city:response.city,
            county:response.county,
            street:response.street,
            floor:response.floor,
            status:response.status

            }; 
    }

    private static toRequestGet(response: any): IDoctorRequestView {
        var statusRo;
        if (response.status=="Waiting")
            statusRo="In așteptare";
        else statusRo="Completă"

        return {
            bloodType: response.bloodType,
            requestedQuantity: response.requestedQuantity,
            currentQuantity: response.currentQuantity,
            emergencyLevel: response.emergencyLevel,
            requestedComponent: response.component,
            rh: response.rh,
            dateOfRequest: response.dateOfRequest,
            CNP: response.patient.cnp,
            fullName: response.patient.firstName + " " + response.patient.lastName,
            id:response.id,
            status:statusRo       
        };
    }
}