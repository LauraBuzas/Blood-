using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using System;
using System.Collections.Generic;
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
    }
}
