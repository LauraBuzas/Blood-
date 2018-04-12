import axios from 'axios';
import { IEmployeeGet } from '../Models/IEmployeeGet';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
import { IEmployeeDelete } from '../Models/IEmployeeDelete';

export class CenterAdminService {
    private static rootEmployees: string = 'http://localhost:51401/employees';
    private static rootRegisterEmployees: string = 'http://localhost:51401/account/register/employee';


    public static getEmployees(): Promise<IEmployeeGet[]> {
      

       // const cookies = new Cookies();
//         cookies.set('.AspNetCore.Identity.Application',
// 'CfDJ8OuumZhDdt1BqP6v0ohxX3zaaoxz1bcKmrVhZDVe6WcNwTHCggMGBoKR-iy2pBv3kNNr7l8LyyGA58qPS2Jbu6LzqY8MjCnlHxZyAg6WV3Icl0W7OJyUZWUOYgQWX1wPxSxMWFAUsOW99hBknqSpaXXKioluEt1C3ZJNe5ec0pZkAxGLpyc5Xz1YMHyB6KWRwJK2lq7qwpMb-vJLCLJtlm3Z43LhhtcJfNIjOWQcuk-oM9ygiOnl8xAMkf6qloJNQV7rTyYtIiXeHgrM2XZV9Zhh_VV7lj7i7YpYhqTrWiENJeI8U5mGrdy0RECujOo5QNxW4d3GUa2AahWPGjVQAgD8qhnTAsWOHwl8d1tpr8xgwLh49STF5M51mFx-cPQm-bKtoSriVJmTG-RBug2YbfUH_K-fB0pVo_YAuu76ZTnS0w_LDA6m8mWROoOU-f7OST96KveYUZxWvgD8cW_xVtCSx6uWbQCe7llcGE5TNCjcQlJQWQy4wTmcU6BJ5OO421nLg3E8bXsUSPsuYNQWptNVCqOmcQKKWsIE1nF1M1oRnSZ9GcW2ZCBucHae3PBxbDuU5KxLO-E2kxWnOyAgMJcy9lFoeATXLE6ns0KhNu5Z6iu2n7dVgmNrt5lY6E6k-LRRhr2gYovyr2H1Q_3Z5kmlSo-Ch56uW6mILmFmimQYoHMF4iIROPxj7568ygSCJvFRc1poTeYnsYZ9y-lQp3w','localhost','/','Session',true,false);
//          cookies.set('CenterId','1','localhost','/','Session',true,false);
       //var centerId=cookies.get('CenterId');

        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployees,
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            ).then((response: any) => {
                let employees = response.data.map(this.toEmployee);
                resolve(employees);
            },
                (error: any) => {
                    reject(error);
                });
        });
    }
    public static addEmployee(employee:IEmployeeGet): Promise<IEmployeeGet> {
        const cookies = new Cookies();
        employee.centerId=cookies.get("CenterId");
        employee.confirmPassword=employee.password;
        return new Promise((resolve, reject) => {
            axios.post(this.rootRegisterEmployees,employee,{withCredentials:true}).then((response: any) => {
                let employee = this.toEmployee(response.data);
                resolve(employee);
            },
                (error: any) => {
                    reject(error);
                })
        });
    }

    public static deleteEmployee(employee:IEmployeeDelete):Promise<any>
    {
        return new Promise((resolve, reject) => {
            axios(
                this.rootEmployees,
                {
                    method:'DELETE',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true,
                    data:employee
                }
            ).then((response: any) => {
                
            },
                (error: any) => {
                    reject(error);
                })
        });

    }

    private static toEmployee(response: any): IEmployeeGet {
        return {
            lastname:response.lastName,
            firstname:response.firstName,
            email:response.email,
            password:response.password,
            confirmPassword:response.password
        };
    }
}