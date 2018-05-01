using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DatabaseAccess.Models;

namespace UnitTestsProject.Models
{
    [TestClass]
    class RequestTest
    {
        public void SmokeTestRequest()
        {
            Request req = new Request();
            req.Id = 23;
            req.BloodType = BloodTypes.AB4;
            req.EmergencyLevel = EmergencyLevel.RIDICAT;
            req.RequestedQuantity = 5;

            Assert.IsTrue(req.Id == 23);
            Assert.IsTrue(req.BloodType.Equals(3));
            Assert.Equals(req.EmergencyLevel, 2);
            Assert.Equals(req.RequestedQuantity, 5);



        }
    }
}
