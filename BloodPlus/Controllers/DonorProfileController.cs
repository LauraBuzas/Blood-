using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services;
using System;
using Microsoft.AspNetCore.Authorization;
using BloodPlus.ModelViews;

namespace BloodPlus.Controllers
{
    [Produces("application/json")]
    [Route("donor/profile")]
    public class DonorProfileController : Controller
    {
        DonorProfileService donorProfileService;
        public DonorProfileController(DonorProfileService donorProfileService)
        {
            this.donorProfileService = donorProfileService;
        }

        [Authorize(Roles ="Donor")]
        [HttpGet("donor")]
        public IActionResult GetDonor()
        {
            try
            {
                string donorId = Request.Cookies["UserId"];
                var donor = donorProfileService.GetDonor(donorId);
                var user = donorProfileService.GetUserForDonor(donorId);
                var address = donorProfileService.GetAddressForDonor(donor.AddressId);
                var donorModel = Mappers.MapperRegisterDonor.ToDonorProfileGet(donor, user,address);
                return Ok(donorModel);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Donor")]
        [HttpPost("info")]
        public IActionResult UpdateInfo([FromBody] DonorGetModelView donorGet)
        {
            try
            {
                string donorId = Request.Cookies["UserId"];
                var user = donorProfileService.GetUserForDonor(donorId);
                var addressId = donorProfileService.GetDonor(donorId).AddressId;
                var donor = Mappers.MapperRegisterDonor.ToDonor(donorGet, user, addressId);
                donorProfileService.UpdateDonor(donor);
                donorProfileService.UpdateEmail(user.Id, donorGet.Email);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
