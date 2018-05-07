using System;
using System.Linq;
using BloodPlus.Mappers;
using BloodPlus.ModelViews;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Services;

namespace BloodPlus.Controllers
{
    [Produces("application/json")]
    [Route("donors")]
    public class DonorController : Controller
    {
        DonorService donorService;
        public DonorController(DonorService donorService)
        {
            this.donorService = donorService;
        }

        [Authorize(Roles = "Donor")]
        [HttpGet("analyses")]
        public IActionResult MedicalAnalyses()
        {
            try
            {
                var id = Request.Cookies["UserId"];
                var analyses = donorService.GetMedicalAnalyses(id)
                                            .Select(ma => MapperMedicalAnalysis.ToMedicalAnalysisViewModel(ma))
                                            .ToList();
                
                return Ok(analyses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Donor")]
        [HttpGet("nextDonation")]
        public IActionResult NextDonation()
        {
            try
            {

                var id = Request.Cookies["UserId"];
                var analyses = donorService.GetMedicalAnalyses(id).AsQueryable().OrderByDescending(a => a.DateAndTime).ToList();
                if (analyses.Count != 0)
                {
                    var lastDonation = analyses[0].DateAndTime;
                    var nextDonation = lastDonation.AddMonths(3);
                    return Ok("Te asteptam sa donezi incepand cu "+nextDonation.ToLongDateString());
                }
                else
                {
                    return Ok("Vino sa donezi acum!");
                }


            }
            catch(Exception ex)
            {
                return BadRequest("Nu putem determina urmatoarea data la care poti sa donezi");
            }
        }

        [AllowAnonymous]
        [HttpPost("registerForDonation")]
        public IActionResult AddRegistration([FromBody] DonorsRegisterForDonationModelView donorsRegisterForDonation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Numele nu este valid!");
            }

            try
            {
                donorService.AddRegistrationForDonation(donorsRegisterForDonation.DonorName);
                return Ok();
            } catch(Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

    }
}