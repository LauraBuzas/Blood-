import { BloodStockModel } from "./BloodStockModel";

export interface IDonorBloodBagView{
    CNP: string,
    fullName: string,
    bloodType: string,
    rh: string,
    bloodBags: BloodStockModel[]
}