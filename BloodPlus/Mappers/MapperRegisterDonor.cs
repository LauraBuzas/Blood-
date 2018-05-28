using BloodPlus.ModelViews.AccountViewModels;
using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BloodPlus.ModelViews;

namespace BloodPlus.Mappers
{
    public class MapperRegisterDonor
    {
        public static Donor ToDonor(RegisterDonorViewModel viewModel, ApplicationUser applicationUser)
        {
            return new Donor
            {
                Id = applicationUser.Id,
                FirstName = viewModel.FirstName,
                LastName = viewModel.LastName,
                CNP = viewModel.CNP,
                
            };
        }

        public static Donor ToDonor(DonorGetModelView viewModel, ApplicationUser applicationUser, int addressId)
        {
            Address address = new Address()
            {
               Id = addressId,
               City = viewModel.City,
               County = viewModel.County,
               Street = viewModel.Street,
               Number = viewModel.Number
            };
            return new Donor
            {
                Id = applicationUser.Id,
                FirstName = viewModel.FirstName,
                LastName = viewModel.LastName,
                CNP = viewModel.CNP,
                Address = address,
                AddressId = address.Id
            };
        }

        public static DonorGetModelView ToDonorProfileGet(Donor donor,ApplicationUser applicationUser,Address address)
        {
            return new DonorGetModelView
            {
                FirstName = donor.FirstName,
                LastName = donor.LastName,
                Email = applicationUser.Email,
                CNP = donor.CNP,
                City = address.City,
                County = address.County,
                Street = address.Street,
                Number = address.Number
            };
        }

        public static Address ToAddress(RegisterDonorViewModel viewModel)
        {
            return new Address
            {
                City=viewModel.City,
                County = viewModel.County,
                Street = viewModel.Street,
                Number =viewModel.Number,

            };
        }
    }
}
