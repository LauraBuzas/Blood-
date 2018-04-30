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
    }
}
