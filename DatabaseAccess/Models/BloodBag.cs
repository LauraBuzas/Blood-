using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseAccess.Models
{
    public class BloodBag
    {
        public int Id { get; set; }

        public MedicalAnalysis Analysis { get; set; }

        public BloodBagStatus Status { get; set; }
        public BloodBagStage Stage { get; set; }

        public Center Center { get; set; }
        public int CenterId { get; set; }



    }
}
