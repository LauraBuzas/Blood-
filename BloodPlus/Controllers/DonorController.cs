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
        [HttpGet("analyses-date")]
        public IActionResult MedicalAnalysesDate()
        {
            try
            {
                var id = Request.Cookies["UserId"];
                var analyses = donorService.GetMedicalAnalyses(id)
                                            .OrderByDescending(a=>a.DateAndTime)
                                            .Select(ma => MapperMedicalAnalysis.ToMedicalAnalysisDate(ma))
                                            .ToList();
                return Ok(analyses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Donor")]
        [HttpGet("analyses/{id}")]
        public IActionResult GetMedicalAnalyseById(int id)
        {
            try
            {
                var idUser = Request.Cookies["UserId"];
                var analyse= donorService.GetMedicalAnalyses(idUser)
                                            .Where(a => a.Id == id)
                                            .FirstOrDefault();
                var analyseModelView = MapperMedicalAnalysis.ToMedicalAnalysisViewModel(analyse);
                return Ok(analyseModelView);
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
                    return Ok(nextDonation);
                }
                else
                {
                    return Ok("");
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

        [Authorize(Roles = "Donor")]
        [HttpGet("donordata")]
        public IActionResult GetDonorFormData()
        {
            try
            {
                var idUser = Request.Cookies["UserId"];
                var donor = donorService.GetDonors().Where(d => d.Id == idUser).First();
                DonorFormData df = new DonorFormData();
                df.Name = donor.FirstName;
                df.Surname = donor.LastName;
                df.Cnp = donor.CNP;
                var adr = donorService.GetDonorAddres(donor.AddressId);
                df.CityD = adr.City;
                df.CountyD = adr.County;
                                
                return Ok(df);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Donor")]
        [HttpGet("donorcontact")]
        public IActionResult GetDonorEmail()
        {
            try
            {
                var idUser = Request.Cookies["UserId"];
                String donoremail = donorService.GetDonorEmail(idUser);
                String phone = donorService.GetDonorPhone(idUser);
                DonorContact dc = new DonorContact();
                dc.Email = donoremail;
                dc.Phone = phone;

                return Ok(dc);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}