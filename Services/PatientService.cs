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

        public void AddPatient(Patient patient)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.PatientRepository.Add(patient);
                uow.Save();
            }
        }
    }
}
