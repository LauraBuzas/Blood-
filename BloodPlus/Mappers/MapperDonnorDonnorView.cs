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
    }
}
