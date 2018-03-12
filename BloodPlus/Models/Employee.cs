using System;


namespace BloodPlus.Models
{
    public class Employee
    {
        public Employee()
        {
            EmployeeId = 0;
            EmployeeName = "";
            AdressId = 0;
            CenterId = 0;
        }
        public Employee(int id, String name, int adrid, int centerid)
        {
            EmployeeId = id;
            EmployeeName = name;
            AdressId = adrid;
            CenterId = centerid;
        }
        public int EmployeeId { get; set; }
        public String EmployeeName { get; set; }
        public int AdressId { get; set; }
        public int CenterId { get; set; }
    }
}
