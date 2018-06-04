using System;
using System.Net.Http;
using System.Threading.Tasks;
using UnitTestsProject.APIUtils;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestsProject.API
{
    [TestClass]
    public class DonorTests
    {
        public static readonly String BaseURL = "http://localhost:49853";
        public static readonly String Password = "Password123.";
        public static readonly String InvalidPassword = "InvalidPassword";
        public static readonly String Donor1 = "donor1@donor.com";
        public static readonly String Laura = "laura_andrada96@yahoo.com";
        public static readonly String InvalidDonor = "d@donor.com";

        [TestMethod]
        public async Task LoginTest()
        {
            var response = await AccountUtils.LoginUserAndGetResponsMessage(Donor1, Password);
            Assert.IsTrue(response.StatusCode == System.Net.HttpStatusCode.OK);

            var response2 = await AccountUtils.LoginUserAndGetResponsMessage(Laura, Password);
            Assert.IsTrue(response2.StatusCode == System.Net.HttpStatusCode.OK);

            var response3 = await AccountUtils.LoginUserAndGetResponsMessage(InvalidDonor, Password);
            Assert.IsTrue(response3.StatusCode == System.Net.HttpStatusCode.BadRequest);

            var response4 = await AccountUtils.LoginUserAndGetResponsMessage(Laura, InvalidPassword);
            Assert.IsTrue(response4.StatusCode == System.Net.HttpStatusCode.BadRequest);
        }

        [TestMethod]
        public async Task GetAnalysesTest()
        {
            var responseBody = await GetAnalysesForDonor(Donor1);
            Assert.IsTrue(responseBody == "[]");

            var responseBody1 = await GetAnalysesForDonor(Laura);
            Assert.IsTrue(responseBody1.Contains("S-a găsit prea multă grăsime în sânge."));
        }

        [TestMethod]
        public async Task GetNextDonationDateTest()
        {
            var responseBody = await GetNextDonationDate(Donor1);
            Assert.IsTrue(responseBody == "\"\"");

            var responseBody1 = await GetNextDonationDate(Laura);
            Assert.IsTrue(responseBody1 != "\"\"");
        }

        private async Task<String> GetAnalysesForDonor(String donorName)
        {
            var analysesURL = BaseURL + "/donors/analyses";
            var response = await LoginClientAndPerformGet(donorName, analysesURL);
            return await response.Content.ReadAsStringAsync();
        }

        private async Task<String> GetNextDonationDate(String donorName)
        {
            var nextDonationURL = BaseURL + "/donors/nextDonation";
            var response = await LoginClientAndPerformGet(donorName, nextDonationURL);
            return await response.Content.ReadAsStringAsync();
        }

        private async Task<HttpResponseMessage> LoginClientAndPerformGet(String donorName, String URL)
        {
            var client = await AccountUtils.LoginUserAndGetClient(donorName, Password);

            var response = await client.GetAsync(URL);
            Assert.IsTrue(response.StatusCode == System.Net.HttpStatusCode.OK);
            return response;
        }

    }    
}
