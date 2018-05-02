using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BloodPlus.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Services;
using BloodPlus.ModelViews;

namespace BloodPlus.Controllers
{
    [Produces("application/json")]
    [Route("employee/profile")]
    public class EmployeeProfileController : Controller
    {
        EmployeeProfileService employeeProfileService;
        public EmployeeProfileController(EmployeeProfileService employeeProfileService)
        {
            this.employeeProfileService = employeeProfileService;
        }


        [Authorize(Roles = "DonationCenterDoctor")]
        [HttpGet("employee")]
        public IActionResult GetEmployee()
        {
            try
            {
                var id = Request.Cookies["CenterDoctorId"];
                //Console.WriteLine("id-ul centrului este: " + id);
                //int idInt = Int32.Parse(id);
                
                var employee = employeeProfileService.GetCenterEmployee(id);
                var user = employeeProfileService.GetUserForEmployee(employee.Id);
                var empView = Mappers.MapperRegisterEmployee.ToEmployeeGet2(employee, user);
                return Ok(empView);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "DonationCenterDoctor")]
        [HttpGet("name")]
        public IActionResult GetCenterName()
        {
            try
            {
                var idEmp = Request.Cookies["CenterDoctorId"];
                var idCent = employeeProfileService.GetCenterEmployee(idEmp).CenterId;
                var centerName = employeeProfileService.GetNameForCenter(idCent);
                return Ok(centerName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
