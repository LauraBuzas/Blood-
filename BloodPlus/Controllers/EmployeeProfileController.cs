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
    [Route("employee/profile")]
    public class EmployeeProfileController : Controller
    {
        EmployeeProfileService employeeProfileService;
        public EmployeeProfileController(EmployeeProfileService employeeProfileService)
        {
            this.employeeProfileService = employeeProfileService;
        }

        public IActionResult GetEmployee()
        {
            try
            {
                var id = Request.Cookies["CenterDoctorId"];
                //Console.WriteLine("id-ul centrului este: " + id);
                //int idInt = Int32.Parse(id);
                var employee = employeeProfileService.GetCenterEmployee(id);
                return Ok(employee);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
