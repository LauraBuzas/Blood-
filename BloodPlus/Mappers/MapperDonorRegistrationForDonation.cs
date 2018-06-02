using BloodPlus.ModelViews;
using DatabaseAccess.Models;
using System;

namespace BloodPlus.Mappers
{
    public class MapperDonorRegistrationForDonation
    {
        public static DonorRegistrationForDonation ToDonorRegistrationForDonation(DonorsRegisterForDonationModelView registration)
        {
            return new DonorRegistrationForDonation
            {
                CNP = registration.CNP,
                Name = registration.Name,
                Surname = registration.Surname,
                BirthDate = registration.BirthDate,
                CityOfBirth = registration.CityOfBirth,
                CountyOfBirth = registration.CountyOfBirth,
                CurrentCity = registration.CurrentCity,
                CurrentCounty = registration.CurrentCounty,
                Age = registration.Age,
                Weigth = registration.Weigth,
                BeatsPerMiute = registration.BeatsPerMiute,
                BloodPressure = registration.BloodPressure,
                HadSurgery = (Surgery)Enum.Parse(typeof(Surgery), registration.HadSurgery.ToUpper()),
                PersonSex = (Sex)Enum.Parse(typeof(Sex), registration.PersonSex.ToUpper()),
                PregnancyStatus = (Pregnancy)Enum.Parse(typeof(Pregnancy), registration.PregnancyStatus.ToUpper()),
                Period = registration.Period,
                HeartDisease = registration.HeartDisease,
                Hypertension = registration.Hypertension,
                KidneyDisease = registration.KidneyDisease,
                MentalIlness = registration.MentalIlness,
                LiverDisease = registration.LiverDisease,
                EndocrineDisease = registration.EndocrineDisease,
                Hepatitis = registration.Hepatitis,
                Tuberculosis = registration.Tuberculosis,
                Pox = registration.Pox,
                Malaria = registration.Malaria,
                Epilepsy = registration.Epilepsy,
                MindIlnesses = registration.MindIlnesses,
                Brucellosis = registration.Brucellosis,
                Ulcer = registration.Ulcer,
                Diabetes = registration.Diabetes,
                HeartDiseases = registration.HeartDisease,
                SkinDiseases = registration.SkinDiseases,
                Myopia = registration.Myopia,
                Cancer = registration.Cancer,
                Email = registration.Email,
                PhoneNumber = registration.PhoneNumber,
                OtherPersonName = registration.OtherPersonName,
                OtherPersonSurname = registration.OtherPersonSurname
            };
        }
    }
}
