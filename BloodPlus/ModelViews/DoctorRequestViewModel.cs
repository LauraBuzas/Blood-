using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class DoctorRequestViewModel
    {
        public PatientAddViewModel Patient { get; set; }

        [Required]
        public string BloodType { get; set; }

        public string Rh { get; set; }

        [Required]
        public string EmergencyLevel { get; set; }
       
        public string Status { get; set; }

        [Required]
        public string Component { get; set; }

        [Required]
        public int RequestedQuantity { get; set; }

        public DateTime dateOfRequest { get; set; }

        public int currentQuantity { get; set; }

        public int id { get; set; }

    }
}
