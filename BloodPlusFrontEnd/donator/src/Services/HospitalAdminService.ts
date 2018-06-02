import axios from 'axios';
import { IDoctorGet } from '../Models/IDoctorGet';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
import { IDoctorDelete } from '../Models/IDoctorDelete';
export class HospitalAdminService {
    private static rootDoctors: string = 'http://localhost:54211/doctors';
    private static rootRegisterDoctors: string = 'http://localhost:54211/account/register/doctor';

  
    public static getDoctors(): Promise<IDoctorGet[]> {
        return new Promise((resolve, reject) => {
            const cookies = new Cookies();
            var asp=cookies.get(".AspNetCore.Identity.Application");
            
            axios(
                this.rootDoctors,
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true,
                        Cookies:".AspNetCore.Identity.Application="+asp
                    },
                    withCredentials:true,
                    maxRedirects:0
                }
            ).then((response: any) => {
                let doctors = response.data.map(this.toDoctor);
                resolve(doctors);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }
    public static addDoctor(doctor:IDoctorGet): Promise<IDoctorGet> {
        const cookies = new Cookies();
        doctor.hospitalId=cookies.get("HospitalId");
        doctor.confirmPassword=doctor.password;

        return new Promise((resolve, reject) => {
            axios(
                this.rootRegisterDoctors,
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:doctor
                }
            ).then((response: any) => {
                let doctor = this.toDoctor(response.data);
                resolve(doctor);
            },
                (error: any) => {
                    reject(error);
                });
        });

    }

    public static deleteDoctor(doctor:IDoctorDelete):Promise<any>
    {
        return new Promise((resolve, reject) => {
            axios(
                this.rootDoctors,
                {
                    method:'DELETE',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true,
                    data:doctor
                }
            ).then((response: any) => {
            
            },
                (error: any) => {
                    reject(error);
                })
        });

    }

    private static toDoctor(response: any): IDoctorGet {
        return {
            lastname:response.lastName,
            firstname:response.firstName,
            email:response.email,
            password:response.password,
            speciality:response.speciality,
            ward:response.ward,
            confirmPassword:response.password
        };
    }
}