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
            using (UnitOfWork uof = new UnitOfWork())
            {
                return uof.DoctorRepository.GetAll().ToList();
            }
        }
    }
}
