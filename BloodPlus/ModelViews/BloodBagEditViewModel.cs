using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BloodPlus.ModelViews
{
    public class BloodBagEditViewModel
    {
        [Required]
        public string CNP { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public string BloodType { get; set; }
        [Required]
        public string Rh { get; set; }
    }
}
