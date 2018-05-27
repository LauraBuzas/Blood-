using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class EmployeeRequestModelView
    {
        [Required]
        public string BloodType { get; set; }

        public string Rh { get; set; }

        [Required]
        public string EmergencyLevel { get; set; }

        [Required]
        public string Component { get; set; }

        [Required]
        public int QuantityNeeded { get; set; }

        public DateTime dateOfRequest { get; set; }

        [Required]
        public int Id { get; set; }

    }
}
