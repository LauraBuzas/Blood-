using Microsoft.VisualStudio.TestTools.UnitTesting;
using DatabaseAccess.Models;
namespace UnitTestsProject
{
    [TestClass]
    public class CenterTest
    {
        [TestMethod]
        public void SmokeTestCenter()
        {
            Center center = new Center();
            
            
            center.Id = 126;
            center.CenterName = "ReginaMaria";
            center.AvailableQuantity = 15.5;

            Assert.IsTrue(center.CenterName.Equals("ReginaMaria"));
            Assert.IsTrue(center.Id == 126);
            Assert.IsTrue(center.AvailableQuantity == 15.5);

           

        }

       
    }
}
