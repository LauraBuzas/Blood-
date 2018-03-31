export interface IDoctorGet
{
    email:string,
    password:string,
    firstname:string,
    lastname:string,
    speciality:string,
    ward:string,
    confirmPassword:string,
    hospitalId?:number
}