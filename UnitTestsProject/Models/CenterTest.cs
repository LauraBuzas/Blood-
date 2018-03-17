using Microsoft.VisualStudio.TestTools.UnitTesting;
using BloodPlus.Models;
namespace UnitTestsProject
{
    [TestClass]
    public class CenterTest
    {
        [TestMethod]
        public void SmokeTestCenter()
        {
            Center center = new Center();
            
            center.AdressId = 125;
            center.Id = 126;
            center.CenterName = "ReginaMaria";
            center.AvailableQuantity = 15.5;

            Assert.IsTrue(center.CenterName.Equals("ReginaMaria"));
            Assert.IsTrue(center.Id == 126);
            Assert.IsTrue(center.AdressId == 125);
            Assert.IsTrue(center.AvailableQuantity == 15.5);

            BloodPlus.Models.Center center2 = new BloodPlus.Models.Center(12, "Cantacuzino", 15, 30);
            Assert.IsTrue(center2.CenterName.Equals("Cantacuzino"));
            Assert.IsTrue(center2.CenterId == 12);
            Assert.IsTrue(center2.AdressId == 15);
            Assert.IsTrue(center2.AvailableQuantity == 30);

        }

       
    }
}
