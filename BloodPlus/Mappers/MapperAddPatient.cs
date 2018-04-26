using BloodPlus.ModelViews;
using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Mappers
{
    public class MapperAddPatient
    {
        public static Patient ToPatientDb(PatientAddViewModel patientAddViewModel)
        {
            Address address = new Address()
            {
                Number = patientAddViewModel.Number,
                Street = patientAddViewModel.Street,
                City = patientAddViewModel.City,
                Floor = patientAddViewModel.Floor,
                County = patientAddViewModel.Country,
                Unit = patientAddViewModel.Unit,
                ApartmentNumber = patientAddViewModel.ApartmentNumber
            };
            Patient patient = new Patient()
            {
                Address = address,
                LastName = patientAddViewModel.LastName,
                FirstName = patientAddViewModel.FirstName,
                CNP = patientAddViewModel.CNP
            };
            return patient;
        }

    }
}
