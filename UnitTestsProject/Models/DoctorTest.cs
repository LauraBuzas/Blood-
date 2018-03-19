using Microsoft.VisualStudio.TestTools.UnitTesting;
using BloodPlus.Models;

namespace UnitTestsProject.Models
{
    [TestClass]
    class DoctorTest
    {
        [TestMethod]
        public void SmokeTestDoctor()
        {
            Doctor doctor = new Doctor();

            doctor.Id = 222;
            doctor.FirstName = "Maria";
            doctor.LastName = "Pop";
            doctor.Ward = "cardiologie";
            doctor.Speciality = "cardiolog";

            Assert.IsTrue(doctor.Id == 222);
            Assert.IsTrue(doctor.FirstName.Equals("Maria"));
            Assert.IsTrue(doctor.LastName.Equals("Pop"));
            Assert.IsTrue(doctor.Ward.Equals("cardiologie"));
            Assert.IsTrue(doctor.Speciality.Equals("cardiolog"));
        }
    }
}
