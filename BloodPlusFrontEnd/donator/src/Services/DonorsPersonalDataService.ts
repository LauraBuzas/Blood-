import axios from 'axios';
import {Config} from './UrlConfig';
import { IDonorInfoGet } from '../Models/IDonorInfoGet';
import { IDonorAnalisys } from '../Models/IDonorAnalysis';
import { resolve } from 'url';
import { ICnpModel } from '../Models/ICnpModel';

export class DonorsPersonalDataService{
    private static rootDonors: string = Config.url+'/employees';

    public static getDonors():Promise<IDonorInfoGet[]>{
        return new Promise((resolve,reject) =>{
        axios(
            this.rootDonors+'/donors-info',{
                method:'GET',
                headers:{
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json'
                },
                withCredentials:true
            }
        ).then((response:any)=>{
            let donors=response.data.map(this.toDonor);
            resolve(donors);
        },
        (error:any)=>{
            reject(error);
        });
    });
    }

    public static getAnalysis(cnp:ICnpModel):Promise<IDonorAnalisys[]>{
        let cnpModel ={
            cnp:cnp
        }
        return new Promise((resolve,reject) =>{
            axios(this.rootDonors+'/donors-history',{
                method:'POST',
                headers:{
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json'
                },
                withCredentials:true,
                data:cnpModel
            }).then((response:any)=>{
                let analysis=response.data.map(this.toAnalysis);
                resolve(analysis);
            },
            (error:any)=>{
                reject(error);
            }
        )
        });
    }
    public static toDonor(response:any):IDonorInfoGet{
        return{
            firstname:response.firstName,
            lastname:response.lastName,
            cnp:response.cnp,
            city:response.city,
            county:response.county,
            street:response.street,
            number:response.number
        };
    }
    public static toAnalysis(row:any):IDonorAnalisys{ //row is response
        return {
            cnp:row.cnp,
            name:row.name,
            surname:row.surname,
            birthDate:row.birthDate,
            cityOfBirth:row.cityOfBirth,
            countyOfBirth:row.countyOfBirth,
            currentCity:row.currentCity,
            currentCounty:row.currentCounty,
            age:row.age,
            weight:row.weigth,
            beatsPerMinute:row.beatsPerMiute,
            bloodPressure:row.bloodPressure,
            hadSurgery:row.hadSurgery,
            personSex:row.personSex,
            pregnancyStatus:row.pregnancyStatus,
            period:row.period,
            heartDisease:row.heartDisease,
            hypertension:row.hypertension,
            kidneyDisease:row.kidneyDisease,
            mentalIlness:row.mentalIlness,
            liverDisease:row.liverDisease,
            endocrineDisease:row.endocrineDisease,
            hepatitis:row.hepatitis,
            tuberculosis:row.tuberculosis,
            pox:row.pox,
            malaria:row.malaria,
            epilepsy:row.epilepsy,
            mindIlnesses:row.mindIlnesses,
            brucellosis:row.brucellosis,
            ulcer:row.ulcer,
            diabetes:row.diabetes,
            heartDiseases:row.heartDiseases,
            skinDiseases:row.skinDiseases,
            myopia:row.myopia,
            cancer:row.cancer,
            email:row.email,
            phoneNumber:row.phoneNumber,
            otherPersonName:row.otherPersonName,
            otherPersonSurname:row.otherPersonSurname,
            registrationDate:row.registrationDate
        }
    }
}