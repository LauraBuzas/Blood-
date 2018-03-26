using DatabaseAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BloodPlus.Controllers
{
    [Produces("application/json")]
    [Route("Doctors")]
    public class DoctorsController : Controller
    {
        DoctorsService doctorsService;

        public DoctorsController(DoctorsService doctorsService)
        {
            this.doctorsService = doctorsService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Doctor> doctors = doctorsService.GetDoctors();          
            return Ok(doctors);
        }


    }
}
