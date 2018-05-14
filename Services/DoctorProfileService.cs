using System;
using System.Collections.Generic;
using System.Text;
using DatabaseAccess.Models;
using DatabaseAccess.UOW;

namespace Services
{
    public class DoctorProfileService
    {
        public Doctor GetDoctor(string DoctorId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.DoctorRepository.GetById(DoctorId);
            }
        }
        public ApplicationUser GetUserForDoctor(string doctorId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.ApplicationUserRepository
                    .GetByFunc(a => a.Id == doctorId);

            }
        }
        public String GetHospitalForDoctor(int hospitalId)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {
                return uow.HospitalRepository.GetById(hospitalId).Name;
            }
        }

        public void UpdateDoctor(Doctor doctor)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {
                uow.DoctorRepository.Update(doctor);
                uow.Save();
            }
        }

        public Hospital GetHospital(int hospitalId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.HospitalRepository.GetById(hospitalId);
            }
        }

        public void UpdateEmail(string userId,String email)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {
                uow.ApplicationUserRepository.GetByFunc(u => u.Id == userId).Email=email;
                uow.ApplicationUserRepository.GetByFunc(u => u.Id == userId).UserName = email;
                uow.ApplicationUserRepository.GetByFunc(u => u.Id == userId).NormalizedEmail = email.ToUpper();
                uow.ApplicationUserRepository.GetByFunc(u => u.Id == userId).NormalizedUserName = email.ToUpper();
                uow.Save();
            }
        }
    }
}
