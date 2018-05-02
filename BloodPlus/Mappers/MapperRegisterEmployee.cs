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

        public static RegisterEmployeeViewModel ToEmployeeGet2(Employee employee, ApplicationUser applicationUser)
        {
            return new RegisterEmployeeViewModel
            {

                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = applicationUser.Email,
                Password = "ChangeMe",
                CenterId = employee.CenterId

            };
        }

        public static Employee ToEmployeeDb(RegisterEmployeeViewModel employee, ApplicationUser applicationUser)
        {
            return new Employee
            {

                Id=applicationUser.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                CenterId=employee.CenterId

            };
        }


    }
}
