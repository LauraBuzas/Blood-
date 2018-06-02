using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class DonorFormData
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Dob { get; set; }
        public string Cnp { get; set; }
        public string CityD { get; set; }
        public string CountyD { get; set; }
        public string CityR { get; set; }
        public string CountyR { get; set; }
        public string Email { get; set; }
    }
}
