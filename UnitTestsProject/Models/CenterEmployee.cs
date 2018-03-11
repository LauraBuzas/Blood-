using Microsoft.VisualStudio.TestTools.UnitTesting;
using BloodPlus.Models;
namespace UnitTestsProject
{
    [TestClass]
    public class CenterEmployee
    {
        [TestMethod]
        public void TestMethodCenter()
        {
            Center center = new Center();
            Assert.IsTrue(center.CenterName.Equals(""));
            Assert.IsTrue(center.CenterId == 0);
            Assert.IsTrue(center.AdressId == 0);
            Assert.IsTrue(center.AvailableQuantity == 0);


            center.AdressId = 125;
            center.CenterId = 126;
            center.CenterName = "ReginaMaria";
            center.AvailableQuantity = 15.5;

            Assert.IsTrue(center.CenterName.Equals("ReginaMaria"));
            Assert.IsTrue(center.CenterId == 126);
            Assert.IsTrue(center.AdressId == 125);
            Assert.IsTrue(center.AvailableQuantity == 15.5);

            Center center2 = new Center(12, "Cantacuzino", 15, 30);
            Assert.IsTrue(center2.CenterName.Equals("Cantacuzino"));
            Assert.IsTrue(center2.CenterId == 12);
            Assert.IsTrue(center2.AdressId == 15);
            Assert.IsTrue(center2.AvailableQuantity == 30);

        }

        [TestMethod]
        public void TestMethodEmployee()
        {
            Employee employee1 = new Employee();
            Assert.IsTrue(employee1.EmployeeId == 0);
            Assert.IsTrue(employee1.EmployeeName.Equals(""));
            Assert.IsTrue(employee1.AdressId == 0);
            Assert.IsTrue(employee1.CenterId == 0);


            employee1.EmployeeId = 12;
            employee1.EmployeeName = "Ionescu";
            employee1.AdressId = 10;
            employee1.CenterId = 15;

            Assert.IsTrue(employee1.EmployeeId == 12);
            Assert.IsTrue(employee1.EmployeeName.Equals("Ionescu"));
            Assert.IsTrue(employee1.AdressId == 10);
            Assert.IsTrue(employee1.CenterId == 15);

            Employee employee2 = new Employee(13, "Vasilescu", 14, 10);
            Assert.IsTrue(employee2.EmployeeId == 13);
            Assert.IsTrue(employee2.EmployeeName.Equals("Vasilescu"));
            Assert.IsTrue(employee2.AdressId == 14);
            Assert.IsTrue(employee2.CenterId == 10);

        }
    }
}
