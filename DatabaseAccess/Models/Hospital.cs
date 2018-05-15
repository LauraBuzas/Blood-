using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DatabaseAccess.Models
{
    public class Hospital
    {
        public Hospital()
        {
            Doctors = new List<Doctor>();
        }

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public HospitalAdmin HospitalAdmin { get; set; }

        public string HospitalAdminId { get; set; }

        public List<Doctor> Doctors { get; set; }

        public Address Address { get; set; }

        public int IdAddress { get; set; }
    }
}
