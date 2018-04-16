using System;


namespace DatabaseAccess.Models
{
    public class Employee
    {
        
        public string Id { get; set; }
        public String LastName { get; set; }
        public String FirstName { get; set; }
        public int Age { get; set; }

        public Center Center { get; set; }
        public int CenterId { get; set; }

    }
}
