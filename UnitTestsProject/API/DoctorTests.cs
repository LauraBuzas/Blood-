using System;
using System.Threading.Tasks;
using UnitTestsProject.APIUtils;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestsProject.API
{
    [TestClass]
    class DoctorTests
    {
        public static readonly String BaseURL = "http://localhost:49853";
        public static readonly String Password = "Password123.";
        public static readonly String doctor1 = "doctor1@spital.com";
        public static readonly String doctor2 = "doctor2@spital.com";
        public static readonly String invalidDoctor = "d@doctor.com";

        [TestMethod]
        public async Task LoginTest()
        {
            var response = await AccountUtils.LoginUserAndGetResponsMessage(doctor1, Password);
            Assert.IsTrue(response.StatusCode == System.Net.HttpStatusCode.OK);

            var response2 = await AccountUtils.LoginUserAndGetResponsMessage(doctor2, Password);
            Assert.IsTrue(response2.StatusCode == System.Net.HttpStatusCode.OK);

            var response3 = await AccountUtils.LoginUserAndGetResponsMessage(invalidDoctor, Password);
            Assert.IsTrue(response3.StatusCode == System.Net.HttpStatusCode.BadRequest);
        }

        [TestMethod]
        public async Task GetDoctorDetailsTask()
        {
            String getDoctorURL = BaseURL + "/doctor/profile/doctor";
            var client = await AccountUtils.LoginUserAndGetClient(doctor1, Password);
            var response = await client.GetAsync(getDoctorURL);
        }
    }
}
