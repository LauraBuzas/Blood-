import axios from 'axios';
import { IDoctorGet } from '../Models/IDoctorGet';
import Cookies from 'universal-cookie';
export class AdminDoctorService {
    private static rootDoctors: string = 'http://localhost:55978/doctors';
    private static rootRegisterDoctors: string = 'http://localhost:55978/account/register/doctor';


    public static getDoctors(): Promise<IDoctorGet[]> {

        const cookies = new Cookies();
        cookies.set('.AspNetCore.Identity.Application',
'CfDJ8Om1XNJeLMtJh84tqTlDYqJ2n2NFdRyPR0QKc3lQ1qolu5gcmCYEaBdQtTL-9_hWWTp_iSRehMOE_k5-OoV_K4PoM0YGGJ-uZ-yIWXAbQ0bPNlsYHEFOjutKBZwUuR9LDJZNkLkNtwePHFNwBu85xQDXw1_zt_UhJloJc5jantSedpj1i3YcVmYoeSiWsTM8EjeKA1TxbH0CWRxZ6JZb671_kroVwL-bTz3ae4mXETnhMaEsM5HZbylChzu2gTSLs2cnkhKIP-gzBTjTnIcHvr9vaccUc8CZ6p8aHhDmiY2mVxBBY7YybIom-2G14_jDx_yaOr-TH8yWcUwmf3IsFcsPzdVMBVyzXO69M--8Y295biGA234D5WLyd5TkeXqRRHRqJMOLmbC8I-mvp4EEn317_MV52p0ptCDq6W1oUJJMMfNw9sm0ZJ2xDF7ZjClvBE31oWHCuyI7ckq-Nr50AZt8CzGFoUp5u4TUgaL4V3gdoyLKVF16zxzyEtnb7gE3nmpoudrybJFQaSwNuQF8JvKp0jXNiEBdG4LnLSih0QVInVjBqUyVyAj9PctMIyapYN7QfsK8JYJje7xGq0tqYoe4vwk_Mbkg6vf2WIbe-2KH1ql3B-0M_znZjVRBFvcHbjFSnkqWYCNvU8Mzw9GdeVa9jX29h16L4W-JuClvCCF4ZiCvZgcqIMFMAAOmWCGv2oyfqmHdyh5uBo7asBn8Tr8'        );
         cookies.set('HospitalId','1');

        return new Promise((resolve, reject) => {
            axios.get(this.rootDoctors,{withCredentials:true}).then((response: any) => {
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
            axios.post(this.rootRegisterDoctors,doctor,{withCredentials:true}).then((response: any) => {
                let doctor = this.toDoctor(response.data);
                resolve(doctor);
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