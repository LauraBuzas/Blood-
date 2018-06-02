using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseAccess.Models
{
    public class Donor
    {
        public Donor()
        {
            MedicalAnalysis = new List<MedicalAnalysis>();
        }
        public string Id { get; set; }

        [Required]
        public string CNP { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
        

        public Address Address { get; set; }

        public int AddressId { get; set; }

        public List<MedicalAnalysis> MedicalAnalysis { get; set; }

        public List<DonorRegistrationForDonation> RegistrationHistory { get; set; }

    }
}
