using Microsoft.VisualStudio.TestTools.UnitTesting;
using DatabaseAccess.Models;
namespace UnitTestsProject
{
    [TestClass]
    public class EmployeeTest
    {
        
        [TestMethod]
        public void SmokeTestEmployee()
        {
            Employee employee1 = new Employee();

            employee1.Id = 12;
            employee1.LastName = "Ionescu";
            employee1.FirstName = "Ion";
            employee1.Age = 30;
            

            Assert.IsTrue(employee1.Id == 12);
            Assert.IsTrue(employee1.LastName.Equals("Ionescu"));
            Assert.IsTrue(employee1.FirstName.Equals("Ion"));
            Assert.IsTrue(employee1.Age == 30);
            

            

        }
    }
}
