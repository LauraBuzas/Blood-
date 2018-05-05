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
                Speciality = viewModel.Speciality,
                Ward = viewModel.Ward,
                HospitalId = viewModel.HospitalId
            };
        }

        public static Doctor ToDoctor(DoctorGetModelView viewModel, ApplicationUser applicationUser,Hospital hospital)
        {
            return new Doctor
            {
                Id = applicationUser.Id,
                FirstName = viewModel.FirstName,
                LastName = viewModel.LastName,
                Speciality = viewModel.Speciality,
                Ward = viewModel.Ward,
                HospitalId = hospital.Id,
                Hospital=hospital
            };
        }

        public static DoctorGetModelView ToDoctorGet(Doctor doctor, ApplicationUser applicationUser)
        {
            return new DoctorGetModelView
            {

                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Email = applicationUser.Email,
                Speciality=doctor.Speciality,
                Ward=doctor.Ward,
                Password = "Password"
            };
        }

        public static DoctorGetModelView ToDoctorProfileGet(Doctor doctor, ApplicationUser applicationUser)
        {
            return new DoctorGetModelView
            {

                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Email = applicationUser.Email,
                Speciality = doctor.Speciality,
                Ward = doctor.Ward,
            };
        }
    }
}
