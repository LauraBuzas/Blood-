import axios from 'axios';
import { IUserGet } from './../Models/IUserGet';
import Cookies from 'universal-cookie';
import { Config } from './UrlConfig';

export class AccountService {

    private static root: string = Config.url + "/account";


    public static loginUser(user: any): Promise<any> {

        return new Promise((resolve, reject) => {
            axios(
                this.root+'/login',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                    data:user
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



        // return new Promise((resolve, reject) => {
        //     axios.post(this.root + "/login", user).then((response: any) => {
        //         var co=new Cookies();
        //         var a=co.get("HospitalId");

        //         console.log(user);
        //         console.log(response);
        //         resolve(response.data);
                
        //     },
        //         (error: any) => {
        //             reject(error);
        //         });
        // });
    }

    public static registerUser(newUser: any) : Promise<any>  {
        return new Promise((resolve, reject) => {
            axios(
                this.root + '/register/donor',
                {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials: true,
                    maxRedirects: 0,
                    data: newUser
                }
            ).then((response: any) => {
                console.log(response);
                console.log(response.headers['set-cookie']);
                resolve(response);
            },
                (error: any) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    public static logoutUser(): Promise<any> {

        return new Promise((resolve, reject) => {
            axios(
                this.root+'/logout',
                {
                    method:'POST',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':true
                    },
                    withCredentials:true,
                    maxRedirects:0,
                }
            ).then((response: any) => {
                resolve(response);
            },
                (error: any) => {
                    reject(error);
                })
        });
    }
}