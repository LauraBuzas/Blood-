using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BloodPlus.ModelViews
{
    public class ChangeStatusViewModel
    {
        [Required]
        public string CNP { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
