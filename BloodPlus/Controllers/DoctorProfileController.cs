using DatabaseAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using BloodPlus.ModelViews;
using BloodPlus.ModelViews.ManageViewModels;

namespace BloodPlus.Controllers
{
    [Produces("application/json")]
    [Route("doctor/profile")]
    public class DoctorProfileController : Controller
    {
        DoctorProfileService doctorProfileService;
        public DoctorProfileController(DoctorProfileService doctorProfileService)
        {
            this.doctorProfileService = doctorProfileService;
        }

        [Authorize(Roles = "HospitalDoctor")]
        [HttpGet("doctor")]
        public IActionResult GetDoctor()
        {
            try
            {
                string doctorId = Request.Cookies["DoctorId"];
                var doctor = doctorProfileService.GetDoctor(doctorId);
                var user = doctorProfileService.GetUserForDoctor(doctorId);
                var doctorModel = Mappers.MapperRegisterDoctor.ToDoctorProfileGet(doctor, user);
                return Ok(doctorModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles ="HospitalDoctor")]
        [HttpGet("hospital")]
        public IActionResult GetHospitalForDoctor()
        {
            try
            {
                string doctorId = Request.Cookies["DoctorId"];
                var hospitalId = doctorProfileService.GetDoctor(doctorId).HospitalId;
                string hospitalName = doctorProfileService.GetHospitalForDoctor(hospitalId);
                Console.WriteLine("\n"+hospitalName+"\n");
                return Ok(hospitalName);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Authorize(Roles ="HospitalDoctor")]
        //[HttpPost("password")]
        //public IActionResult UpdatePassword([FromBody] ChangePasswordViewModel changePassword)
        //{

        //}

        [Authorize(Roles ="HospitalDoctor")]
        [HttpPost("info")]
        public IActionResult UpdateInfo([FromBody] DoctorGetModelView doctorGet)
        {
            try
            {
                string doctorId = Request.Cookies["DoctorId"];
                var user = doctorProfileService.GetUserForDoctor(doctorId);
                var hospitalId = doctorProfileService.GetDoctor(doctorId).HospitalId;
                var hospital = doctorProfileService.GetHospital(hospitalId);
                var doctor = Mappers.MapperRegisterDoctor.ToDoctor(doctorGet, user,hospital);
                doctorProfileService.UpdateDoctor(doctor);
                doctorProfileService.UpdateEmail(user.Id,doctorGet.Email);
                return Ok();
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
