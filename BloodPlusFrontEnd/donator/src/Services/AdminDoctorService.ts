import axios from 'axios';
import { IDoctorGet } from '../Models/IDoctorGet';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
import { IDoctorDelete } from '../Models/IDoctorDelete';
export class AdminDoctorService {
    private static rootDoctors: string = 'http://localhost:51401/doctors';
    private static rootRegisterDoctors: string = 'http://localhost:51401/account/register/doctor';


    public static getDoctors(): Promise<IDoctorGet[]> {
      

        const cookies = new Cookies();
        cookies.set('.AspNetCore.Identity.Application',
'CfDJ8Om1XNJeLMtJh84tqTlDYqJ1h9lhpEM6Y9Td5MKM8U6vZV1p6r6l0taadc8tZhc4z0I3BjPwwPBPgXU8nq0H9TGD0r08JSQUBEw4lLfE-VT6xwSLVF_c1EYrNvyhOoFO2TURk5o7B14tIPjcVXgRSq4KLkJ9eiB0SCSD6yb1eM1EEAMNICQFOceXDrimQ2QLz88E-xYlkRzqSwPTgrhsXSyNWdbUdA06pkxmSs8azlbILyGLA3Kju8TLqmb_66o8qITGCJ4XVFEjck5YNOmoX-vebxmsGEg7LvqJYppuPPA04Z1_GwIyMq0Q8N_NV3jKNZgfWI8BYMShyLyd2D9AmwynB74gbkIClhxACNOeCYmUPiQyzI3iMPqsv026KCwtEyMnBw6PC7OpURZPVHnkDycM6qBQeHIt_zYglNJJm-0nGEHdXx7Vy4R5frBVwGvhIHXVRgEyvd3PCY5PjED4wSAiOZh3gtvfRVGB8NFg9YzOIQC4vOfbZTi_JAxRHHrtr7xsrIMhpGzMzY8NonwaLhwqtOn5RMXCmyYi8A5F1VZp8tpwzGz-WcjfyMfcouSHVljDtPXpOiXX16Bd6A3IdL1L7mWqBzdOAFAzLJsAmJl9du5knjo83cgrigdwPhvXw-YtbupbP152TRmEgU7lzpxek6noszXEFg7id8FSJy7mIuTKhya-FmMstUjlVGnPoBdXX_z1vuidYahlkNJD70c','localhost','/','Session',true,false);
         cookies.set('HospitalId','1','localhost','/','Session',true,false);

        return new Promise((resolve, reject) => {
            axios(
                this.rootDoctors,
                {
                    method:'GET',
                    headers:{
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
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
            axios.post(this.rootRegisterDoctors,doctor,{withCredentials:true}).then((response: any) => {
                let doctor = this.toDoctor(response.data);
                resolve(doctor);
            },
                (error: any) => {
                    reject(error);
                })
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
                // let doctor = this.toDoctor(response.data);
                // resolve(doctor);
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