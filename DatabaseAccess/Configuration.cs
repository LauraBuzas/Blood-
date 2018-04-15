using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseAccess
{
    public static class Configuration
    {
        public static string ConnectionString
        {
            get
            {
                return "Data Source=i3-PC\\SQLEXPRESS;Initial Catalog=BloodPlus2;Integrated Security=True;";
            }
        }
    }
}
