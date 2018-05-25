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
                Unit=patientAddViewModel.Unit
            };

            if (patientAddViewModel.Floor != null)
                address.Floor = int.Parse(patientAddViewModel.Floor);
            if (patientAddViewModel.Floor != null)
                address.ApartmentNumber = int.Parse(patientAddViewModel.ApartmentNumber);
            return address;
        }

        public static Address ToAddress(PatientGetExtendedModelView patientExtViewGet)//,int id)
        {
            return new Address
            {
                //Id = id,
                City = patientExtViewGet.City,
                County = patientExtViewGet.County,
                Street = patientExtViewGet.Street,
                Number = int.Parse(patientExtViewGet.Nr),
            };
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

        public static Patient ToPatient(PatientGetExtendedModelView patientExtGetView)
        {
            
            
            Patient patient = new Patient()
            {
                Id = (int)patientExtGetView.Id,
                CNP = patientExtGetView.CNP,
                LastName = patientExtGetView.LastName,
                FirstName = patientExtGetView.FirstName,
                Status = PatientStatus.INTERNAT,        //Sa MODIFICI AICI
                //Address = address
                //IdAddress = address.Id
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

        public static PatientGetExtendedModelView ToPatientExtendedGet(Patient patient,Address address)
        {
            PatientGetExtendedModelView patientModelView = new PatientGetExtendedModelView()
            {
                Id = patient.Id,
                CNP = patient.CNP,
                LastName = patient.LastName,
                FirstName = patient.FirstName,
                City = address.City,
                County = address.County,
                Street = address.Street,
                ApartmentNumber = address.Number.ToString(),
                Floor = address.Floor.ToString(),
                Status = patient.Status.ToString()

            };
            return patientModelView;
        }

        public static PatientAddViewModel ToPatientAdd(Patient patient)
        {

            PatientAddViewModel patientViewModel = new PatientAddViewModel()
            {
               CNP=patient.CNP,
               FirstName=patient.FirstName,
               LastName = patient.LastName

            };
            return patientViewModel;
        }

    }
}
