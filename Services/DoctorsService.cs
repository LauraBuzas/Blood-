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
        public List<Center> GetCenters()
        {
            using(UnitOfWork uow= new UnitOfWork())
            {
                var nearestCenters = from center in uow.CenterRepository.GetAll()
                                     join address in uow.AddressRepository.GetAll() on center.IdAddress equals address.Id
                                     where address.City.Equals("Cluj-Napoca")
                                     select center;


                return nearestCenters.ToList();
            }
        }

        public List<Address> GetCenterAddresses()
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                List<Center> centers = GetCenters();
                List<Address> addresses = new List<Address>();
                foreach (Center c in centers)
                {
                    var alladdress = (from center in uow.CenterRepository.GetAll()
                                     join addr in uow.AddressRepository.GetAll() on center.IdAddress equals addr.Id
                                     select addr).ToList();

                    addresses.Concat(alladdress);

                }
                return addresses;
            }

        }

        public List<Plasma> GetPlasmasQty()
        {
            using(UnitOfWork uow= new UnitOfWork())
            {
                List<Center> centers = GetCenters();
                List<Plasma> plasmas = new List<Plasma>();
                foreach(Center c in centers){
                    var plasmaqty = (from center in uow.CenterRepository.GetAll()
                                     join plasma in uow.PlasmaRepository.GetAll() on center.Id equals plasma.CenterId
                                     select plasma).ToList();

                    plasmas.Concat(plasmaqty);

                }
                return plasmas;
            }
        }

        public List<Thrombocyte> GetThrombocyteQty()
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                List<Center> centers = GetCenters();
                List<Thrombocyte> thrombocytes = new List<Thrombocyte>();
                foreach (Center c in centers)
                {
                    var thrombocyteqty = (from center in uow.CenterRepository.GetAll()
                                     join thr in uow.ThrombocyteRepository.GetAll() on center.Id equals thr.CenterId
                                     select thr).ToList();

                    thrombocytes.Concat(thrombocyteqty);

                }
                return thrombocytes;
            }
        }

        public List<RedBloodCell> GetRedBloodCellQty()
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                List<Center> centers = GetCenters();
                List<RedBloodCell> redcells = new List<RedBloodCell>();
                foreach (Center c in centers)
                {
                    var redcellsqty = (from center in uow.CenterRepository.GetAll()
                                          join redcell in uow.RedBloodCellRepository.GetAll() on center.Id equals redcell.CenterId
                                          select redcell).ToList();

                    redcells.Concat(redcellsqty);

                }
                return redcells;
            }
        }


        public List<BloodBag> GetBloodBagsQty()
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                List<Center> centers = GetCenters();
                List<BloodBag> bags = new List<BloodBag>();
                foreach (Center c in centers)
                {
                    var bagsqty = (from center in uow.CenterRepository.GetAll()
                                       join bag in uow.BloodBagRepository.GetAll() on center.Id equals bag.CenterId
                                       select bag).ToList();

                    bags.Concat(bagsqty);

                }
                return bags;
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
