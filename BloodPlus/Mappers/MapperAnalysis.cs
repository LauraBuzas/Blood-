using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatabaseAccess.Models;
using BloodPlus.ModelViews;

namespace BloodPlus.Mappers
{
    public class MapperAnalysis
    {
        public static DonorAnalysisModelView toDonorRegistrationForDonationModelView(DonorRegistrationForDonation d)
        {
            return new DonorAnalysisModelView
            {
                CNP = d.CNP,
                Name=d.Name,
                Surname =d.Surname,
                BirthDate = d.BirthDate.ToString(),
                CityOfBirth = d.CityOfBirth,
                CountyOfBirth = d.CountyOfBirth,
                CurrentCity = d.CurrentCity,
                CurrentCounty = d.CurrentCounty,
                Age = d.Age,
                Weigth = d.Weigth,
                BeatsPerMiute = d.BeatsPerMiute,
                BloodPressure = d.BloodPressure,
                HadSurgery = d.HadSurgery.ToString(),
                PersonSex = d.PersonSex.ToString(),
                PregnancyStatus = d.PregnancyStatus.ToString(),
                Period = d.Period,
                HeartDisease =d.HeartDisease,
                Hypertension = d.Hypertension,
                KidneyDisease = d.KidneyDisease,
                MentalIlness = d.MentalIlness,
                LiverDisease = d.LiverDisease,
                EndocrineDisease = d.EndocrineDisease,
                Hepatitis = d.Hepatitis,
                Tuberculosis = d.Tuberculosis,
                Pox = d.Pox, 
                Malaria = d.Malaria,
                Epilepsy = d.Epilepsy,
                MindIlnesses = d.MindIlnesses,
                Brucellosis = d.Brucellosis,
                Ulcer = d.Ulcer,
                Diabetes = d.Diabetes,
                HeartDiseases =d.HeartDiseases,
                SkinDiseases = d.SkinDiseases,
                Myopia = d.Myopia,
                Cancer = d.Cancer,
                Email = d.Email,
                PhoneNumber = d.PhoneNumber,
                OtherPersonName = d.OtherPersonName,
                OtherPersonSurname =d.OtherPersonSurname,
                RegistrationDate = d.RegistrationDate.ToString()
        

            };
        }

        //public static DonorRegistrationForDonation toDonorRegistrationForDonation(DonorAnalysisModelView d)
        //{
        //    Donor donor = new Donor
        //    {
        //        CNP = "278010203412",
        //        FirstName = "Ileana",
        //        LastName = "Tudorescu",
        //        AddressId = 10
        //    };
        //    return new DonorRegistrationForDonation
        //    {
        //        Id = 1,
        //        CNP = 27801,
        //        Name = "Ileana",
        //        Surname = "Tudorescu",
        //        BirthDate = DateTime.Now,
        //        CityOfBirth = d.CityOfBirth,
        //        CountyOfBirth = d.CountyOfBirth,
        //        CurrentCity = d.CurrentCity,
        //        CurrentCounty = d.CurrentCounty,
        //        Age = d.Age,
        //        Weigth = d.Weigth,
        //        BeatsPerMiute = d.BeatsPerMiute,
        //        BloodPressure = d.BloodPressure,
        //        HadSurgery = Surgery.No,
        //        PersonSex = Sex.Female,
        //        PregnancyStatus = Pregnancy.NotPregnant,
        //        Period = d.Period,
        //        HeartDisease = d.HeartDisease,
        //        Hypertension = d.Hypertension,
        //        KidneyDisease = d.KidneyDisease,
        //        MentalIlness = d.MentalIlness,
        //        LiverDisease = d.LiverDisease,
        //        EndocrineDisease = d.EndocrineDisease,
        //        Hepatitis = d.Hepatitis,
        //        Tuberculosis = d.Tuberculosis,
        //        Pox = d.Pox,
        //        Malaria = d.Malaria,
        //        Epilepsy = d.Epilepsy,
        //        MindIlnesses = d.MindIlnesses,
        //        Brucellosis = d.Brucellosis,
        //        Ulcer = d.Ulcer,
        //        Diabetes = d.Diabetes,
        //        HeartDiseases = d.HeartDiseases,
        //        SkinDiseases = d.SkinDiseases,
        //        Myopia = d.Myopia,
        //        Cancer = d.Cancer,
        //        Email = d.Email,
        //        PhoneNumber = d.PhoneNumber,
        //        OtherPersonName = d.OtherPersonName,
        //        OtherPersonSurname = d.OtherPersonSurname,
        //        RegistrationDate = DateTime.Now,
        //        Donor = donor,
        //        DonorId = "9c9ac312-af49-4d2f-8ef0-1fcc57984860"
        //    };
        //}
    }
}
