using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace BloodPlus.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        public int IdHospital { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Ward { get; set; }

        [Required]
        public string Speciality { get; set; }

        
    }
}
