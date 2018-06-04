using System;
using BloodPlus.ModelViews;
using System.Threading.Tasks;
using UnitTestsProject.APIUtils;
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
        public async Task GetDoctorDetailsTest()
        {
            String getDoctorURL = BaseURL + "/doctor/profile/doctor";

            var response = await LoginDoctorAndGetDetails(getDoctorURL, doctor1);
            Assert.IsTrue(response.Contains("Vasile"));
            Assert.IsTrue(response.Contains("Ionescu"));
            Assert.IsTrue(response.Contains("Sectia 1"));
            Assert.IsTrue(response.Contains("Chirurg"));
            Assert.IsTrue(response.Contains("doctor1@spital.com"));

            var response1 = await LoginDoctorAndGetDetails(getDoctorURL, doctor2);
            Assert.IsTrue(response1.Contains("Daniel"));
            Assert.IsTrue(response1.Contains("Popa"));
            Assert.IsTrue(response1.Contains("Sectia 2"));
            Assert.IsTrue(response1.Contains("Dermatolog"));
            Assert.IsTrue(response1.Contains("doctor2@spital.com"));
        }

        [TestMethod]
        public async Task GetHospitalDetailsTest()
        {
            String getHospitalURL = BaseURL + "/doctor/profile/hospital";

            var response = await LoginDoctorAndGetDetails(getHospitalURL, doctor1);
            Assert.IsTrue(response.Contains("Spitalul Clinic Municipal"));

            var response1 = await LoginDoctorAndGetDetails(getHospitalURL, doctor2);
            Assert.IsTrue(response1.Contains("Spitalul Clinic Judetean de Urgenta"));
        }

        [TestMethod]
        public async Task UpdateDctorInfoTest()
        {
            String updateURL = BaseURL + "/doctor/profile/info";
            String getDoctorURL = BaseURL + "/doctor/profile/doctor";

            var newDoctor = CreateNewDoctor();
            var client = await AccountUtils.LoginUserAndGetClient(doctor1, Password);
            var payload = HttpUtils.CreateContent(newDoctor);

            var response = await client.PostAsync(updateURL, payload);
            Assert.IsTrue(response.StatusCode == System.Net.HttpStatusCode.OK);

            var response1 = await LoginDoctorAndGetDetails(getDoctorURL, doctor1);
            Assert.IsTrue(response1.Contains("Sectia 2"));

            newDoctor.Ward = "Sectia 1";
            payload = HttpUtils.CreateContent(newDoctor);

            response = await client.PostAsync(updateURL, payload);
            Assert.IsTrue(response.StatusCode == System.Net.HttpStatusCode.OK);

            response1 = await LoginDoctorAndGetDetails(getDoctorURL, doctor1);
            Assert.IsTrue(response1.Contains("Sectia 1"));

        }

        private async Task<String> LoginDoctorAndGetDetails(String URL, String doctor)
        {
            var client = await AccountUtils.LoginUserAndGetClient(doctor, Password);
            var response = await client.GetAsync(URL);
            Assert.IsTrue(response.StatusCode == System.Net.HttpStatusCode.OK);
            return await response.Content.ReadAsStringAsync();
        }

        private DoctorGetModelView CreateNewDoctor()
        {
            return new DoctorGetModelView
            {
                Email = doctor1,
                FirstName = "Vasile",
                LastName = "Ionescu",
                Password = Password,
                Speciality = "Chirurg",
                Ward = "Sectia 2"
            };
        }
    }
}
