using BloodPlus.ModelViews;
using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Mappers
{
    public class MapperDoctorRequest
    {
        public static Request ToDoctorRequestDb(DoctorRequestViewModel requestViewModel)
        {
            return new Request()
            {
                BloodType = (BloodTypes)Enum.Parse(typeof(BloodTypes), requestViewModel.BloodType.ToUpper()),
                EmergencyLevel = (EmergencyLevel)Enum.Parse(typeof(EmergencyLevel), requestViewModel.EmergencyLevel.ToUpper()),
                Rh = (RhTypes)Enum.Parse(typeof(RhTypes), requestViewModel.Rh.ToUpper()),
                Status = RequestStatus.Waiting,
                RequestedQuantity = requestViewModel.RequestedQuantity       
            };

        }
    }
}
