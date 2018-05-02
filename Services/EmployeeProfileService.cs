using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace Services
{
    public class EmployeeProfileService
    {
        public Employee GetCenterEmployee(string idEmployee)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {
                return uow.EmployeeRepository.GetById(idEmployee);
            }
        }

        public ApplicationUser GetUserForEmployee(string employeeId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.ApplicationUserRepository
                    .GetByFunc(a => a.Id == employeeId);

            }
        }

        public String GetNameForCenter(int id)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {
                return uow.CenterRepository.GetByFunc(a => a.Id == id).CenterName;

            }
        }

        
    }
}
