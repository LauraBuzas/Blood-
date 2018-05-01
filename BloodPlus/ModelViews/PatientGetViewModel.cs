using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class PatientGetViewModel
    {
        [Required]
        public string CNP { get; set; }
        public string FullName { get; set; }
    }
}
