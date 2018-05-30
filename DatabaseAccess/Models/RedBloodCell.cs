using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseAccess.Models
{
    public class RedBloodCell
    {
        public int Id { get; set; }

		public MedicalAnalysis Analysis { get; set; }

		public DateTime SeparationDateAndTime { get; set; }

        public DateTime ExpirationDateAndTime { get; set; }

        public BloodTypes BloodType { get; set; }

        public ComponentStatus Status { get; set; }

        public RhTypes RhType { get; set; }
        public Center Center { get; set; }
        public int CenterId { get; set; }
       

	}
}
