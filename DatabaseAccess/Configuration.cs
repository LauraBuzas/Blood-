
namespace DatabaseAccess
{
    public static class Configuration
    {
        public static string ConnectionString
        {
            get
            {

                return "Data Source=localhost\\SQLEXPRESS01;Initial Catalog=BloodPlus3;Integrated Security=True;";

                return "Data Source=DESKTOP-KBM8R90\\SQLEXPRESS;Initial Catalog=BloodPlus;Integrated Security=True;";


            }
        }
    }
}
