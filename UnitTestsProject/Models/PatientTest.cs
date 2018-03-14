using System;
using System.Collections.Generic;
using System.Text;
using BloodPlus.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestsProject.Models
{   [TestClass]
    class PatientTest
    {
        [TestMethod]
        public void SmokeTestPatient()
        {
            Patient pat1 = new Patient();
            pat1.Id = 12;
            pat1.CNP = "1970719082356";
            pat1.LastName = "Macalan";
            pat1.FirstName = "Dorel Marian";

            Assert.IsTrue(pat1.Id == 12);
            Assert.Equals(pat1.CNP, "1970719082356");
            Assert.IsTrue(pat1.LastName.Equals("Macalan"));
            Assert.IsNotNull(pat1.FirstName);

        }
    }
}
