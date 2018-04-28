import { IPatientAdd } from "./IPatientAdd";

export interface IDoctorRequest
{
    patient:IPatientAdd,
    bloodType:string,
    rh:string,
    emergencyLevel:string,
    requestedQuantity:number,
    component:string
}