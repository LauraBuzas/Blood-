using BloodPlus.ModelViews.AccountViewModels;
using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Mappers
{
    public static class MapperRegisterEmployee
    {
        public static RegisterEmployeeViewModel ToEmployeeGet(Employee employee, ApplicationUser applicationUser)
        {
            return new RegisterEmployeeViewModel
            {
               
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email=applicationUser.Email,
                Password="ChangeMe"

            };
        }
    }
}
