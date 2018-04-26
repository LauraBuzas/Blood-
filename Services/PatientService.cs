using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public class PatientService
    {
        public Patient GetPatientByCNP(string cnp)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.PatientRepository.GetByFunc(p => p.CNP == cnp);

            }
        }

        public void AddPatient(Patient patient,Address address)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.AddressRepository.Add(address);
                uow.Save();
                patient.IdAddress = address.Id;
                uow.PatientRepository.Add(patient);
                uow.Save();
            }
        }
    }
}
