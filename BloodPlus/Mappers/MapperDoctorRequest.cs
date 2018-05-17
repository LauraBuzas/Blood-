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

            var request = new Request()
            {
                BloodType = (BloodTypes)Enum.Parse(typeof(BloodTypes), requestViewModel.BloodType.ToUpper()),
                EmergencyLevel = (EmergencyLevel)Enum.Parse(typeof(EmergencyLevel), requestViewModel.EmergencyLevel.ToUpper()),
                Status = RequestStatus.Waiting,
                RequestedQuantity = requestViewModel.RequestedQuantity,
                Component = (ComponentType)Enum.Parse(typeof(ComponentType), requestViewModel.Component)
            };
            if (requestViewModel.Rh != null)
                request.Rh = (RhTypes)Enum.Parse(typeof(RhTypes), requestViewModel.Rh.ToUpper());
            return request;

        }

        public static DoctorRequestViewModel ToDoctorRequestViewModel(Request request)
        {
            var requestViewModel = new DoctorRequestViewModel()
            {
                BloodType = request.BloodType.ToString(),
                EmergencyLevel = request.EmergencyLevel.ToString(),
                Patient =MapperPatient.ToPatientAdd(request.Patient),
                Rh = request.Rh.ToString(),
                Status = request.Status.ToString(),
                RequestedQuantity = request.RequestedQuantity,
                dateOfRequest = request.DateOfRequest,
                currentQuantity= request.ReceivedQuantity,
                id=request.Id
            };

            switch (request.Component)
            {
                case ComponentType.BloodBag:
                    requestViewModel.Component = "Sange neseparat";
                    break;
                case ComponentType.Thrombocyte:
                    requestViewModel.Component = "Trombocite";
                    break;
                case ComponentType.Plasma:
                    requestViewModel.Component = "Plasma";
                    break;
                case ComponentType.RedBloodCells:
                    requestViewModel.Component = "Celule rosii";
                    break;
                default:
                    break;
            }

            return requestViewModel;

        }
    }
}
