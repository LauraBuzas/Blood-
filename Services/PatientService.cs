using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public void UpdatePatient(Patient pat)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.PatientRepository.Update(pat);
                uow.Save();
            }
        }

        public void AddPatient(Patient patient,Address address)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.AddressRepository.Add(address);
                uow.Save();
                patient.IdAddress = address.Id;

                patient.IsActiveDonor = ActiveDonor(patient.CNP);

                uow.PatientRepository.Add(patient);
                uow.Save();
            }
        }

        public Address GetAddressForPatient(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.AddressRepository.GetById(id);
            }
        }

        public List<Patient> GetHospitalizedPatientsForDoctor(string idDoctor)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.PatientRepository.GetAll().Where(p => p.IdDoctor == idDoctor && p.Status==PatientStatus.INTERNAT).ToList();
            }
        }

        public bool ActiveDonor(string cnp)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var donor = uow.DonorRepository.GetAll().Include(d=>d.MedicalAnalysis).Where(d => d.CNP.Equals(cnp)).FirstOrDefault();
                if(donor == null)
                {
                    return false;
                }

                var analyses = donor.MedicalAnalysis.OrderByDescending(a => a.DateAndTime).ToList();
                if(analyses.Count==0)
                {
                    return false;
                }

                var latestAnalysisDate = analyses[0].DateAndTime;
                var aYear = 365;
                if((DateTime.Now-latestAnalysisDate).Days > aYear)
                {
                    return false;
                }

                return true;
            }
        }
    }
}
