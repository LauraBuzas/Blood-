using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services
{
    public class EmployeeService
    {
        public Employee AddEmployee(Employee employee)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.EmployeeRepository.Add(employee);
                uow.Save();
                return employee;
            }
        }

        public List<Employee> GetEmployeesFromCenter(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.EmployeeRepository.GetAll().Where(e=>e.CenterId==id).ToList();
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

        public void DeleteEmployee(string email)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                ApplicationUser user = uow.ApplicationUserRepository.GetByFunc(u => u.Email == email);
                Employee employee = uow.EmployeeRepository.GetByFunc(d => d.Id == user.Id);
                uow.EmployeeRepository.Delete(employee);
                uow.ApplicationUserRepository.Delete(user);
                uow.Save();
            }
        }
    }
}
