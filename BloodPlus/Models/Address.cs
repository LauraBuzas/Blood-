using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Models
{
    public class Address
    {
        //public Address(
        //        int id, 
        //        string city, 
        //        string county, 
        //        string street, 
        //        int number, 
        //        int apartmentNumber, 
        //        int unit, 
        //        int floor
        //    ) { //uratel
        //    Id = id;
        //    City = city;
        //    County = county;
        //    Street = street;
        //    Number = number;
        //    ApartmentNumber = apartmentNumber;
        //    Unit = unit;
        //    Floor = floor;
        //}

        public int Id { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string County { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public int Number { get; set; }

        public int ApartmentNumber { get; set; }

        //scara
        public int Unit { get; set; }

        public int Floor { get; set; }

    }
}
