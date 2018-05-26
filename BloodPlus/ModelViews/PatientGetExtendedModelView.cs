using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class PatientGetExtendedModelView
    {
        public int Id { get; set; }  

        [Required]
        public string CNP { get; set; }


        public string LastName { get; set; }


        public string FirstName { get; set; }


        public string City { get; set; }


        public string County { get; set; }


        public string Street { get; set; }

        public string Nr { get; set; }

        public string ApartmentNumber { get; set; }

        public string Unit { get; set; }

        public string Floor { get; set; }

        public string Status { get; set; }
    }
}
