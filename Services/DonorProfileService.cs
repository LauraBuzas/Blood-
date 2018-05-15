using System;
using System.Collections.Generic;
using System.Text;
using DatabaseAccess.Models;
using DatabaseAccess.UOW;

namespace Services
{
    public class DonorProfileService
    {
        public Donor GetDonor(string DonorId)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {
                return uow.DonorRepository.GetById(DonorId);
            }
        }

        public ApplicationUser GetUserForDonor(string donorId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.ApplicationUserRepository.GetByFunc(a => a.Id == donorId);
            }
        }

        public Address GetAddressForDonor(int id)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {
                return uow.AddressRepository.GetById(id);
            }
        }

        public void UpdateDonor(Donor donor)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.DonorRepository.Update(donor);
                uow.Save();
            }
        }

        public void UpdateEmail(string userId,string email)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.ApplicationUserRepository.GetByFunc(u => u.Id == userId).Email = email;
                uow.ApplicationUserRepository.GetByFunc(u => u.Id == userId).UserName = email;
                uow.ApplicationUserRepository.GetByFunc(u => u.Id == userId).NormalizedEmail = email.ToUpper();
                uow.ApplicationUserRepository.GetByFunc(u => u.Id == userId).NormalizedUserName = email.ToUpper();
                uow.Save();
            }
        }
    }
}
