import axios from 'axios';
import { IPatient } from '../Models/IPatient';
import { IDoctorRequest } from '../Models/IDoctorRequest';
import { IDoctorRequestView } from '../Models/IDoctorRequestView';


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
    private static toPatientGet(response: any): IPatient {
        return {
            fullname:response.fullName,
            CNP:response.cnp
        }; 
    }

    private static toRequestGet(response: any): IDoctorRequestView {
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
            id:response.id
            
        };
    }
}