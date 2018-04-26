using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseAccess.Models
{
    public class RedBloodCell
    {
        public int Id { get; set; }

        public DateTime SeparationDateAndTime { get; set; }

        public DateTime ExpirationDateAndTime { get; set; }

        //please check if blood type matters when it comes to Red Blood Cells
        public BloodTypes BloodType { get; set; }

    }
}
