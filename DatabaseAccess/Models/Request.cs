using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace DatabaseAccess.Models
{
    public class Request
    {
        public int Id { get; set; }

        public BloodTypes BloodType { get; set; }

        public RhTypes Rh { get; set; }

        public Patient Patient { get; set; }

        public int IdPatient { get; set; }

        [Required]
        public EmergencyLevel EmergencyLevel { get; set; }

        [Required]
        public RequestStatus Status { get; set; }

        [Required]
        public int RequestedQuantity { get; set; }

        public int ReceivedQuantity { get; set; }


    }
}
