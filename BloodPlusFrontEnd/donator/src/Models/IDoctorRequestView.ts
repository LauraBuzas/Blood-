import { IPatient } from "./IPatient";

export interface IDoctorRequestView{
    patient: IPatient,
    requestedQuantity: number,
    currentQuantity: number,
    emergencyLevel: string,
    requestedComponent: string,
    bloodType: string,
    rh: string,
    dateOfRequest: Date
}