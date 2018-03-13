using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Models
{
    public class Donor
    {

        public Donor(int id, string CNP, string firstName, string lastName, string email, string phone)
        {
            this.Id = id;
            this.CNP = CNP;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Email = email;
            this.PhoneNumber = phone;
        }

        public int Id { get; set; }

        [Required]
        public string CNP { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        public string PhoneNumber { get; set; }



    }
}
