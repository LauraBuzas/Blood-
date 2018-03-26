using Microsoft.VisualStudio.TestTools.UnitTesting;
using DatabaseAccess.Models;

namespace UnitTestsProject.Models
{
    [TestClass]
    class HospitalTest
    {

        [TestMethod]
        public void SmokeTestHospital()
        {
            Hospital hospital = new Hospital();

            hospital.Id = 222;
            hospital.Name = "Bagdasar-Arseni";

            Assert.IsTrue(hospital.Id == 222);
            Assert.IsTrue(hospital.Name.Equals("Bagdasar-Arseni"));     
        }
    }
}
