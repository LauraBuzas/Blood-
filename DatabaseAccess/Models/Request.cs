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

        //Grupa
        public string BloodType { get; set; }


        //public int IdPatient { get; set;}

        [Required]
        public int EmergencyLevel { get; set; }

        //[Required]
        //public int IdHospital { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public int RequestedQuantity { get; set; }

        //public int IdDoctor { get; set; }
 
    }
}
