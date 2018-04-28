using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class DoctorsService
    {

         public List<Doctor> GetDoctors(int HospitlId)
         {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.DoctorRepository.GetAll()
                    .Where(d=>d.HospitalId==HospitlId)
                    .ToList();
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

        public Doctor AddDoctor(Doctor doctor)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.DoctorRepository.Add(doctor);
                uow.Save();
                return doctor;
            }
        }

        public void DeleteDoctor(string email)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                ApplicationUser user=uow.ApplicationUserRepository.GetByFunc(u => u.Email == email);
                Doctor doctor = uow.DoctorRepository.GetByFunc(d => d.Id == user.Id);
                uow.DoctorRepository.Delete(doctor);
                uow.ApplicationUserRepository.Delete(user);
                uow.Save();
            }
        }

        public Doctor GetDoctorById(string id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
               return uow.DoctorRepository.GetByFunc(d => d.Id == id);
            }
        }

        public void AddRequest(Request request)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.DoctorRequestRepository.Add(request);
                uow.Save();
            }
        }

        public List<Request> GetRequests(string id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var requests = uow.DoctorRepository.GetAll()
                                                   .Include(doctor => doctor.Patients)
                                                   .ThenInclude(patient => patient.Requests)
                                                   .Where(doctor => doctor.Id == id)
                                                   .FirstOrDefault()
                                                   .Patients
                                                   .Select(patient => patient.Requests)
                                                   .SelectMany(request => request)
                                                   .ToList();
                return requests;
            }
        }
    }
}
