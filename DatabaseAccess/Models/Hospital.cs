using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DatabaseAccess.Models
{
    public class Hospital
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
