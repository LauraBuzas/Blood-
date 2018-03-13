using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace BloodPlus.Models
{
    public class Patient
    {
      

        public int Id { get; set; }

        [Required]
        public string CNP { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        /*
        //CodA
        public int IdAddress { get; set; }

        //CodD
        public int IdDoctor { get; set; }
        */
  

    }
}
