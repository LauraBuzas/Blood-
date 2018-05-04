using System;
using System.Collections.Generic;
using BloodPlus.Mappers;
using BloodPlus.ModelViews;
using BloodPlus.ModelViews.AccountViewModels;
using DatabaseAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;



namespace BloodPlus.Controllers
{
    [Produces("application/json")]
    [Route("employees")]
    public class EmployeeController : Controller
    {

        EmployeeService employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        [Authorize(Roles = "DonationCenterAdmin")]
        [HttpGet]
        public IActionResult GetEmployees()
        {
            var centerId = Request.Cookies["CenterId"];
            List<Employee> employees = employeeService.GetEmployeesFromCenter(Int32.Parse(centerId));
            List<RegisterEmployeeViewModel> employeesView = new List<RegisterEmployeeViewModel>();
            foreach (var employee in employees)
            {
                var user = employeeService.GetUserForEmployee(employee.Id);
                employeesView.Add(Mappers.MapperRegisterEmployee.ToEmployeeGet(employee, user));
            }
            return Ok(employeesView);
        }


        [HttpGet("requests")]
        public IActionResult GetRequests()
        {
            var centerId = Request.Cookies["CenterId"];
            List<Request> requests = employeeService.GetRequests(int.Parse(centerId));
            return Ok(requests);
        }

        [Authorize(Roles = "DonationCenterAdmin")]
        [HttpDelete]
        public IActionResult DeleteEmployeeByEmail([FromBody] EmployeeDeleteViewModel employeeDelete)
        {
            try
            {

                employeeService.DeleteEmployee(employeeDelete.Email);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Can't delete employee with email " + employeeDelete.Email);
            }
        }

        //[Authorize(Roles = "DonationCenterDoctor")]
        //[HttpPost("Transfusion")]
        //public IActionResult AddTransfusion([FromBody])
        //{

        //}

        [Authorize(Roles = "DonationCenterDoctor")]
        [HttpPost("blood-bag")]
        public IActionResult AddBloodBag([FromBody] CNPViewModel cnpViewModel)
        {
            try
            {
                var centerId = int.Parse(Request.Cookies["CenterId"]);
                employeeService.DonateBlood(cnpViewModel.CNP,centerId);
                return Ok("Blood bag registered");
            }
            catch(Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Authorize(Roles = "DonationCenterDoctor")]
        [HttpPost("analysis")]
        public IActionResult FillAnalysis([FromBody] MedicalAnalysisViewModel analysisViewModel)
        {
            try
            {
                var analysis = MapperMedicalAnalysis.ToMedicalAnalysis(analysisViewModel);
                employeeService.FillAnalysis(analysis, analysisViewModel.CNP);

                return Ok("Analysis updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}