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
                return "Data Source=DESKTOP-DH0N1BE\\SQLEXPRESS;Initial Catalog=BloodPlus;Integrated Security=True;";
            }
        }
    }
}
