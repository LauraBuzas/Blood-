using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews.AccountViewModels
{
    public class RegisterEmployeeViewModel : RegisterViewModel
    {

        [Required]
        public String LastName { get; set; }
        [Required]
        public String FirstName { get; set; }
        [Required]
        public int Age { get; set; }
    }

}
