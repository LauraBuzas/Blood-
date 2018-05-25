export interface IPatientGet
{
    id:number,
    cnp:string,
    lastname:string,
    firstname:string,
    city:string,
    county:string,
    street:string,
    nr?:number,
    apartmentNumber?:number,
    floor:string,
    status:string
}