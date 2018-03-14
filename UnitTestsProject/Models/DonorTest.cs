using Microsoft.VisualStudio.TestTools.UnitTesting;
using BloodPlus.Models;

namespace UnitTestsProject.Models
{
    [TestClass]
    public class DonorTest
    {
        [TestMethod]
        public void SmokeTestDonor() {
            Donor donor = new Donor() {
                Id = 1,
                CNP = "1234567890",
                FirstName = "Ion",
                LastName = "Pop",
                Email = "ionpop@ubb.com",
                PhoneNumber = "0000"
            };
            Assert.IsTrue(donor.Id == 1);
            Assert.IsTrue(donor.CNP.Equals("1234567890"));
            Assert.IsTrue(donor.FirstName.Equals("Ion"));
            Assert.IsTrue(donor.LastName.Equals("Pop"));
            Assert.IsTrue(donor.Email.Equals("ionpop@ubb.com"));
            Assert.IsTrue(donor.PhoneNumber.Equals("0000"));

            donor.Id = 2;
            donor.CNP = "aaa";
            donor.FirstName = "fn";
            donor.LastName = "ln";
            donor.Email = "email";
            donor.PhoneNumber = "123";

            Assert.IsTrue(donor.Id == 2);
            Assert.IsTrue(donor.CNP.Equals("aaa"));
            Assert.IsTrue(donor.FirstName.Equals("fn"));
            Assert.IsTrue(donor.LastName.Equals("ln"));
            Assert.IsTrue(donor.Email.Equals("email"));
            Assert.IsTrue(donor.PhoneNumber.Equals("123"));
        }
    }
}
