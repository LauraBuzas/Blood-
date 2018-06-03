using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BloodPlus.ModelViews;
using BloodPlus.ModelViews.AccountViewModels;
using DatabaseAccess.Models;

namespace BloodPlus.Mappers
{
    public class MapperBloodBag
    {
        public static Thrombocyte ToThrombocyte(BloodBag bloodBag)
        {
            return new Thrombocyte
            {
                BloodType = bloodBag.BloodType,
                ExpirationDateAndTime = bloodBag.Date.AddDays(5),
                RhType = bloodBag.RhType,
                SeparationDateAndTime = DateTime.Now,
                CenterId = bloodBag.CenterId,
                Analysis = bloodBag.Analysis,
                Status = ComponentStatus.Available
            };
        }

        public static RedBloodCell ToRedBloodCell(BloodBag bloodBag)
        {
            return new RedBloodCell
            {
                BloodType = bloodBag.BloodType,
                ExpirationDateAndTime = bloodBag.Date.AddDays(42),
                RhType = bloodBag.RhType,
                SeparationDateAndTime = DateTime.Now,
                CenterId = bloodBag.CenterId,
                Analysis = bloodBag.Analysis,
                Status = ComponentStatus.Available
            };
        }

        public static Plasma ToPlasma(BloodBag bloodBag)
        {
            return new Plasma
            {
                BloodType = bloodBag.BloodType,
                ExpirationDateAndTime = bloodBag.Date.AddDays(26),
                SeparationDateAndTime = DateTime.Now,
                CenterId = bloodBag.CenterId,
                Analysis = bloodBag.Analysis,
                Status = ComponentStatus.Available
            };
        }
    }
}
