using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus
{
    public static class Configuration
    {
        public static string ConnectionString
        {
            get
            {
                return "Data Source=DESKTOP-0R9KCBS;Initial Catalog=BloodPlus;Integrated Security=True;";
            }
        }
    }
}
