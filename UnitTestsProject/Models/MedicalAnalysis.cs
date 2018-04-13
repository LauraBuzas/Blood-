using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestsProject.Models
{
    public class MedicalAnalysis
    {
        public int Id { get; set; }

        public bool HIV { get; set; }

        public bool HepatitisB { get; set; }

        public bool HepatitisC { get; set; }

        public bool Sifilis { get; set; }

        public bool HTLV { get; set; }

        public float ALTLevel { get; set; }



    }
}
