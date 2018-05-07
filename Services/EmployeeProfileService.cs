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

        public void UpdateEmployee(Employee e)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {
                uow.EmployeeRepository.Update(e);
                uow.Save();
                
            }
        }

        public void UpdateEmployeeEmail(String userId, String email)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.ApplicationUserRepository.GetByFunc(a => a.Id == userId).Email = email;
                uow.ApplicationUserRepository.GetByFunc(a => a.Id == userId).UserName = email;
                uow.ApplicationUserRepository.GetByFunc(a => a.Id == userId).NormalizedEmail = email.ToUpper();
                uow.ApplicationUserRepository.GetByFunc(a => a.Id == userId).NormalizedUserName = email.ToUpper();
                uow.Save();
            }
        }

        
    }
}
