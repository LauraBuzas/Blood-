
namespace DatabaseAccess
{
    public static class Configuration
    {
        public static string ConnectionString
        {
            get
            {
                return "Data Source=localhost\\SQLEXPRESS;Initial Catalog=BloodPlus;Integrated Security=True;";
            }
           
        }
    }
}
