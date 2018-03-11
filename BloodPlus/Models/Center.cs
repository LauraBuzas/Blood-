using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Models
{
    public class Center
    {
        public Center()
        {
            CenterId = 0;
            CenterName = "";
            AdressId = 0;
            AvailableQuantity = 0;
        }
        public Center(int id,String name,int adrid,double qty)
        {
            CenterId = id;
            CenterName = name;
            AdressId = adrid;
            AvailableQuantity = qty;
        }
        public int CenterId { get; set; }
        public String CenterName { get; set; }
        public int AdressId { get; set; }
        
        public double AvailableQuantity { get; set; }

    }
}
