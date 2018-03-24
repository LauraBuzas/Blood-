using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace DatabaseAccess.Models
{
    public class Doctor
    {
        public string Id { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Ward { get; set; }

        [Required]
        public string Speciality { get; set; }

        //public ApplicationUser User { get; set; }
        //public string UserID { get; set; }

    }
}
