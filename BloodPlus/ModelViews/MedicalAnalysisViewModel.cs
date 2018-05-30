using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class MedicalAnalysisViewModel
    {
        [Required]
        public bool HIV { get; set; }

        [Required]
        public bool HepatitisB { get; set; }

        [Required]
        public bool HepatitisC { get; set; }

        [Required]
        public bool Sifilis { get; set; }

        [Required]
        public bool HTLV { get; set; }

        [Required]
        public bool ALTLevel { get; set; }

        [Required]
        public string CNP { get; set; }

        public DateTime DateAndTime { get; set; }

        [Required]
        public bool RejectedOtherCauses { get; set; }
        
        public string Observations { get; set; }
    }
}
