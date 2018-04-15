using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BloodPlus.Mappers;
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
                var id = Request.Cookies["Id"];
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
    }
}