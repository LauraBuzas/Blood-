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

        public Address GetAddressForPatient(int idAddress)
        {
            using( UnitOfWork uow = new UnitOfWork())
            {
                return uow.AddressRepository.GetById(idAddress);
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

        public Request GetDoctorRequest(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.DoctorRequestRepository.GetByFunc(dr => dr.Id == id);
            }
        }

        public Request AddRequest(Request request)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                request.DateOfRequest = DateTime.Now;
                uow.DoctorRequestRepository.Add(request);
                uow.Save();
            }
            return request;
        }

        public List<Request> GetRequests(string id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var requests = uow.DoctorRepository.GetAll()
                                                   .Include(doctor => doctor.Patients)
                                                   .ThenInclude(patient => patient.Address)
                                                   .Include(doctor => doctor.Patients)
                                                   .ThenInclude(patient=>patient.Requests)
                                                   .Where(doctor => doctor.Id == id)
                                                   .FirstOrDefault()
                                                   .Patients
                                                   .Select(patient => patient.Requests)
                                                   .SelectMany(request => request)
                                                   .OrderByDescending(r=>r.EmergencyLevel)
                                                   .ToList();
                return requests;
            }
        }
    }
}
