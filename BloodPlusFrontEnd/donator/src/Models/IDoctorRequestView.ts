import { IPatient } from "./IPatient";

export interface IDoctorRequestView{
    CNP: string,
    fullName: string,
    requestedQuantity: number,
    currentQuantity: number,
    emergencyLevel: string,
    requestedComponent: string,
    bloodType: string,
    rh: string,
    dateOfRequest: string,
    id:number
}