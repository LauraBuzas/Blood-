using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class PatientChangeStatus
    {
        [Required]
        public string CNP { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
