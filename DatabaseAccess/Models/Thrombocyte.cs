using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseAccess.Models
{
    public class Thrombocyte

    {
        public int Id { get; set; }

        public DateTime SeparationDateAndTime { get; set; }

        public DateTime ExpirationDateAndTime { get; set; }

        public BloodTypes BloodType { get; set; }

        public RhTypes RhType { get; set; }
    }
}
