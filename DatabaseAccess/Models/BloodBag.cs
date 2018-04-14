using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseAccess.Models
{
    public class BloodBag
    {
        public MedicalAnalysis Analysis { get; set; }

        public int AnalysisId { get; set; }

        public BloodBagStatus Status { get; set; }

    }
}
