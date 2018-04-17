using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class DoctorDeleteModelView
    {
        [Required]
        public string Email { get; set; }

    }
}
