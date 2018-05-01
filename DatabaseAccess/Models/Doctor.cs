using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace DatabaseAccess.Models
{
    public class Doctor
    {
        public Doctor()
        {
            Patients = new List<Patient>();
        }

        public string Id { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Ward { get; set; }

        [Required]
        public string Speciality { get; set; }

        public Hospital Hospital { get; set; }
        public int HospitalId { get; set; }

        public List<Patient> Patients { get; set; }

    }
}
