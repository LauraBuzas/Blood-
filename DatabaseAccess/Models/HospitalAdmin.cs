using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseAccess.Models
{
    public class HospitalAdmin
    {
        public string Id { get; set; }

        public Hospital Hospital { get; set; }
    }
}
