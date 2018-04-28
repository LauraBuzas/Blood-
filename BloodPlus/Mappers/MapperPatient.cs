using BloodPlus.ModelViews;
using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Mappers
{
    public class MapperPatient
    {
        public static Address ToAddressDb(PatientAddViewModel patientAddViewModel)
        {
            Address address= new Address()
            {
                Number = int.Parse(patientAddViewModel.Nr),
                Street = patientAddViewModel.Street,
                City = patientAddViewModel.City,
                County = patientAddViewModel.County,
            };

            if (patientAddViewModel.Floor != null)
                address.Floor = int.Parse(patientAddViewModel.Floor);
            if (patientAddViewModel.Floor != null)
                address.Unit = int.Parse(patientAddViewModel.Unit);
            if (patientAddViewModel.Floor != null)
                address.ApartmentNumber = int.Parse(patientAddViewModel.ApartmentNumber);
            return address;
        }

        public static Patient ToPatientDb(PatientAddViewModel patientAddViewModel)
        {
            
            Patient patient = new Patient()
            {
                LastName = patientAddViewModel.LastName,
                FirstName = patientAddViewModel.FirstName,
                CNP = patientAddViewModel.CNP
            };
            return patient;
        }

        public static PatientGetViewModel ToPatientGet(Patient patient)
        {

            PatientGetViewModel patientViewModel = new PatientGetViewModel()
            {
                FullName= patient.LastName+" "+patient.FirstName,
                CNP = patient.CNP
            };
            return patientViewModel;
        }

    }
}
