import axios from 'axios';
import { IPatient } from '../Models/IPatient';


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
  
    private static toPatientGet(response: any): IPatient {
        return {
            fullname:response.fullName,
            CNP:response.CNP
        };
    }
}