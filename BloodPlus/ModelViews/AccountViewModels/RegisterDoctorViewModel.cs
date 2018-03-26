using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews.AccountViewModels
{
    public class RegisterDoctorViewModel:RegisterViewModel
    {
        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Speciality { get; set; }

        [Required]
        public string Ward { get; set; }

    }
}
