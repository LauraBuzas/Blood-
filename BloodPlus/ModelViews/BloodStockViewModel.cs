using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class BloodStockViewModel
    {
		public int ID { get; set; }
		public string Type { get; set; }
		public string Group { get; set; }
		public string Rh { get; set; }
		public string Donor { get; set; }
		public string Date { get; set; }
		public string Status { get; set; }

	}
}
