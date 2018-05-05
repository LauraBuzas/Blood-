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
                return "Data Source=DESKTOP-02E53VM\\SQLEXPRESS01;Initial Catalog=BloodPlus;Integrated Security=True;";
            }
        }
    }
}
