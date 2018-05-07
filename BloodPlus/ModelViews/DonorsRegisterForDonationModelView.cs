using System;
using System.ComponentModel.DataAnnotations;

namespace BloodPlus.ModelViews
{
    public class DonorsRegisterForDonationModelView
    {
        [Required]
        public String DonorName { get; set; }
    }
}
