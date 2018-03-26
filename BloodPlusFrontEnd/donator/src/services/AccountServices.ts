import axios from 'axios';
import { IUserGet } from './../Models/IUserGet';

export class AccountService {
    private static root: string = "http://localhost:49853/account";

    public static loginUser(user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(this.root + "/login", user).then((response: any) => {
                console.log(user);
                localStorage.setItem('token', response.data.access_token)
                console.log(response);
                resolve(response.data);
            },
                (error: any) => {
                    reject(error);
                });
        });
    //     console.log(user);
    //     return fetch(this.root + "/login", {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(user)        
    //     })
    //         .then(resp => console.log(resp))
    //         .catch((error) => console.error(error));
    }
}