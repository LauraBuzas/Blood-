using System;
using System.Collections.Generic;

namespace DatabaseAccess.Models
{
    public class Center
    {
        public Center()
        {
            Employees = new List<Employee>();
            BloodBags = new List<BloodBag>();
            Plasmas = new List<Plasma>();
            Thrombocytes = new List<Thrombocyte>();
            RedBloodCells = new List<RedBloodCell>();       
        }

        public int Id { get; set; }
        public String CenterName { get; set; }
        public double AvailableQuantity { get; set; }

        public List<Employee> Employees { get; set; }

        public CenterAdmin CenterAdmin { get; set; }

        public string CenterAdminId { get; set; }

        public List<BloodBag> BloodBags { get; set; }

        public List<Plasma> Plasmas { get; set; }

        public List<Thrombocyte> Thrombocytes { get; set; }

        public List<RedBloodCell> RedBloodCells { get; set; }

        public Address Address { get; set; }

        public int IdAddress { get; set; }
    }
}
