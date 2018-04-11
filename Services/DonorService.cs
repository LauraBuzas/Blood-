using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using System;
using System.Collections.Generic;
using System.Text;

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

                donor.Address = address;
                uow.DonorRepository.Add(donor);
                uow.Save();
                return donor;
            }
        }

    }
}
