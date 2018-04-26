using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class PatientAddViewModel
    {
        [Required]
        public string CNP { get; set; }

       
        public string LastName { get; set; }

       
        public string FirstName { get; set; }

        
        public string City { get; set; }

      
        public string Country { get; set; }

       
        public string Street { get; set; }

       
        public int Number { get; set; }

        public int ApartmentNumber { get; set; }

        public int Unit { get; set; }

        public int Floor { get; set; }
    }
}
