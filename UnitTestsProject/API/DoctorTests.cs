using System;
using System.Net.Http;
using System.Threading.Tasks;
using UnitTestsProject.APIUtils;
using BloodPlus.ModelViews;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestsProject.API
{
    [TestClass]
    public class DoctorTests
    {
        public static readonly String BaseURL = "http://localhost:49853";
        public static readonly String Password = "Password123.";
        public static readonly String doctor1 = "doctor1@spital.com";
        public static readonly String doctor2 = "doctor2@spital.com";
        public static readonly String invalidDoctor = "d@doctor.com";

        [TestMethod]
        public async Task AddRequestTest()
        {
            var URL = BaseURL + "/doctors/addRequest";
            var doctorRequest = new DoctorRequestViewModel
            {
                BloodType = "O1",
                Rh = "NEGATIV",
                EmergencyLevel = "RIDICAT",
                Component = "BloodBag"
            };
            var payload = HttpUtils.CreateContent(doctorRequest);
            var client = await AccountUtils.LoginUserAndGetClient(doctor1, Password);
            var response = await client.PostAsync(URL, payload);
            Assert.IsTrue(response.StatusCode == System.Net.HttpStatusCode.OK);
        }
    }
}
