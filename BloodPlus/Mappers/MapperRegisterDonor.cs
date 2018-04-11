using BloodPlus.ModelViews.AccountViewModels;
using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public static Address ToAddress(RegisterDonorViewModel viewModel)
        {
            return new Address
            {
                City=viewModel.City,
                County = viewModel.County,
                Street = viewModel.Street,
                Number = viewModel.Number
            };
        }
    }
}
