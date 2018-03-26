using DatabaseAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace BloodPlus.Controllers
{
    [Produces("application/json")]
    [Route("doctors")]
    [Authorize(Roles ="HospitalDoctor")]
    public class DoctorsController : Controller
    {
        DoctorsService doctorsService;

        public DoctorsController(DoctorsService doctorsService)
        {
            this.doctorsService = doctorsService;
        }

        [HttpGet]
        public IActionResult GetDoctors()
        {
            var hospitalId=Request.Cookies["HospitalId"];
            List<Doctor> doctors = doctorsService.GetDoctors(Int32.Parse(hospitalId));          
            return Ok(doctors);
        }


    }
}
