using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseAccess.Models
{
    public class MedicalAnalysis
    {
        public int Id { get; set; }

        public bool HIV { get; set; }

        public bool HepatitisB { get; set; }

        public bool HepatitisC { get; set; }

        public bool Sifilis { get; set; }

        public bool HTLV { get; set; }

        public bool ALTLevel { get; set; }

        public BloodBag BloodBag { get; set; }

        public int BloodBagId { get; set; }

        public Donor Donor { get; set; }

        public string DonorId { get; set; }

        public DateTime DateAndTime { get; set; }

        public bool RejectedOtherCauses { get; set; }

        public string Observations { get; set; }


    }
}
