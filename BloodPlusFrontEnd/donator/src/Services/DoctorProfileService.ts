import axios from 'axios';
import { IDoctorGet } from '../Models/IDoctorGet';
import { IDoctorUpdate } from '../Models/IDoctorUpdate';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
import { IPasswordUpdate } from '../Models/IPasswordUpdate';
import { resolve } from 'path';
export class DoctorProfileService{
    private static rootDoctor: string = 'http://localhost:54211/doctor/profile';
    public static getDoctor(): Promise<IDoctorGet> {
        return new Promise((resolve, reject) => {
            //var doctorId=cookies.get("DoctorId");
            axios(
                this.rootDoctor+"/doctor",
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true,
                }
            ).then((response: any) => {
                //let doctor = response.data.map(this.toDoctor);
                let doctor={
                    firstname:response.data.firstName,
                    lastname:response.data.lastName,
                    email:response.data.email,
                    password:response.data.password,
                    speciality:response.data.speciality,
                    ward:response.data.ward,
                    confirmPassword:response.data.password
                }
                resolve(doctor);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }
    public static getHospitalForDoctor():Promise<String>{
        return new Promise((resolve,reject)=>{
            axios(this.rootDoctor+"/hospital",{
                method:'GET',
                headers:{
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json'
                },
                withCredentials:true
            }
            ).then((response:any)=>{
                let hospitalName=response.data
                resolve(hospitalName);
            },
            (error:any)=>{
                reject(error);
            });
        });
    }
    public static updateInfo(doctor:IDoctorUpdate):Promise<any>{

        return new Promise((resolve, reject) => {
            axios(
                this.rootDoctor+"/info",
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
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static updatePassword(passwordUpdate:IPasswordUpdate):Promise<any>{
        return new Promise((resolve, reject) => {
            axios(
                "http://localhost:57738/manage/change",
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:passwordUpdate
                }
            ).then((response: any) => {
                resolve(response.data);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }
}

//du-ma putin la functie und