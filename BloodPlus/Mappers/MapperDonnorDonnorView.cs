using BloodPlus.ModelViews;
using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Mappers
{
    public class MapperDonnorDonnorView
    {
        public static DonorModelView ToDonorModelView(Donor donor)
        {
            return new DonorModelView
            {
                FirstName = donor.FirstName,
                LastName = donor.LastName,
                CNP = donor.CNP,

            };
        }

        public static DonorInfoGetModelView ToDonorInfoModelView(Donor donor)
        {
            return new DonorInfoGetModelView
            {
                FirstName=donor.FirstName,
                LastName=donor.LastName,
                CNP=donor.CNP,
                City=donor.Address.City,
                County=donor.Address.County,
                Street=donor.Address.Street,
                Number=donor.Address.Number
            };
        }
    }
}
