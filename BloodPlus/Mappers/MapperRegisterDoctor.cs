using BloodPlus.ModelViews;
using BloodPlus.ModelViews.AccountViewModels;
using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Mappers
{
    public class MapperRegisterDoctor
    {
        public static Doctor ToDoctor(RegisterDoctorViewModel viewModel,ApplicationUser applicationUser)
        {
            return new Doctor
            {
                Id = applicationUser.Id,
                FirstName = viewModel.FirstName,
                LastName = viewModel.LastName,
                Speciality=viewModel.Speciality,
                Ward=viewModel.Ward
            };
        }

        public static DoctorGetModelView ToDoctorGet(Doctor doctor, ApplicationUser applicationUser)
        {
            return new DoctorGetModelView
            {

                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Email = applicationUser.Email,
                Password = "zsdsdas"
            };
        }
    }
}
