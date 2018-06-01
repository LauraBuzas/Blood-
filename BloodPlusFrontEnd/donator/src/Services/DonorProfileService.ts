import axios from 'axios';
import { IDonorGet } from '../Models/IDonorGet';
import {IDonorUpdate} from '../Models/IDonorUpdate';
import {IPasswordUpdate} from '../Models/IPasswordUpdate'
import Cookies from 'universal-cookie';
import { Session } from 'inspector';

import { Config } from './UrlConfig';

export class DonorProfileService{
    private static rootDonor: string = Config.url + '/donor/profile';
    public static getDonor(): Promise<IDonorGet> {
        return new Promise((resolve, reject) => {
            //var doctorId=cookies.get("DoctorId");
            axios(
                this.rootDonor+"/donor",
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
                let donor:IDonorGet={
                    firstname:response.data.firstName,
                    lastname:response.data.lastName,
                    email:response.data.email,
                    password:response.data.password,
                    CNP:response.data.cnp,
                    city:response.data.city,
                    county:response.data.county,
                    street:response.data.street,
                    number:response.data.number,
                    confirmPassword:response.data.confirmPassword
                }
                resolve(donor);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }

    public static updateInfo(donor:IDonorUpdate):Promise<any>{

        return new Promise((resolve, reject) => {
            axios(
                this.rootDonor+"/info",
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:donor
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