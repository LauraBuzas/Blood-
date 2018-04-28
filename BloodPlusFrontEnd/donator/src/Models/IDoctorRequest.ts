import { IPatientAdd } from "./IPatientAdd";

export interface IDoctorRequest
{
    patient:IPatientAdd,
    bloodType:string,
    rh:string,
    emergencyLevel:string,
    reguestedQuantity:number,
    component:string
}