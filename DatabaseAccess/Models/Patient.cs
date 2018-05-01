using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace DatabaseAccess.Models
{
    public class Patient
    {
        public Patient()
        {
            Requests = new List<Request>();
        }

        public int Id { get; set; }

        [Required]
        public string CNP { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        public Address Address { get; set; }

        public int IdAddress { get; set; }

        public Doctor Doctor { get; set; }

        public string IdDoctor { get; set; }

        public List<Request> Requests { get; set; }

        public PatientStatus Status { get; set; }



    }
}
