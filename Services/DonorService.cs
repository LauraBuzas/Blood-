using BloodPlus.Services;
using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class DonorService
    {

        public Donor AddDonor(Donor donor, Address address)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.AddressRepository.Add(address);
                uow.Save();

                donor.AddressId = address.Id;
                uow.DonorRepository.Add(donor);
                uow.Save();
                return donor;
            }
        }

        public List<MedicalAnalysis> GetMedicalAnalyses(string id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.DonorRepository.GetAll().Include(d => d.MedicalAnalysis)
                    .Where(d => d.Id == id)
                    .FirstOrDefault().MedicalAnalysis;
            }
        }
        

        public void AddRegistrationForDonation(String donorName)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                //var registration = new DonorRegistrationForDonation();
                //registration.DonorName = donorName;
                //registration.RegistrationDate = DateTime.Now;

                //uow.DonorRegistrationForDonationRepository.Add(registration);
                //uow.Save();
            }
        }

        public async Task<int> SendEmails(IEmailSender _emailSender,int centerId)
        {
            int numberOfEmailsSent = 0;
            using (UnitOfWork uow = new UnitOfWork())
            {
                var centerAddress = uow.CenterRepository.GetAll().Include(c => c.Address)
                                    .First(c => c.Id == centerId).Address;
               
                var users = uow.DonorRepository.GetAll()
                                .Include(d => d.Address)
                                .Where(d => d.Address.City == centerAddress.City);

                await users.ForEachAsync(u =>
                {
                    var email = uow.ApplicationUserRepository.GetById(u.Id).Email;
                    var result = _emailSender.SendEmailConfirmationAsync(email, u, centerAddress);
                    numberOfEmailsSent += result.IsCompletedSuccessfully ? 1 : 0;
                });
            }
            return numberOfEmailsSent;

        }

        public List<Donor> GetDonors()
        {
            using (var uow = new UnitOfWork())
            {
                return uow.DonorRepository.GetAll().ToList();
            }
        }
    }
}
