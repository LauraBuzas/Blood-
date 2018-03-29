using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class DoctorsService
    {
         public List<Doctor> GetDoctors()
         {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.DoctorRepository.GetAll().ToList();
            }
         }

        public Doctor AddDoctor(Doctor doctor)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.DoctorRepository.Add(doctor);
                uow.Save();
                return doctor;
            }
        }
    }
}
