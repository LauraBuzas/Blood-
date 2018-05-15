using System;
using System.Collections.Generic;
using BloodPlus.Mappers;
using BloodPlus.ModelViews;
using BloodPlus.ModelViews.AccountViewModels;
using BloodPlus.Services;
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
        DonorService donorService;
        private readonly IEmailSender _emailSender;


        public EmployeeController(EmployeeService employeeService,DonorService donorService, IEmailSender _emailSender)
        {
            this.employeeService = employeeService;
            this._emailSender = _emailSender;
            this.donorService = donorService;
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
        public IActionResult AddBloodBag([FromBody] BloodBagViewModel bloodBagViewModel)
        {
            try
            {
                var centerId = int.Parse(Request.Cookies["CenterId"]);
                employeeService.DonateBlood(bloodBagViewModel.CNP,bloodBagViewModel.BloodType,bloodBagViewModel.Rh,centerId);
                return Ok("Blood bag registered");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
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

        [Authorize(Roles = "DonationCenterDoctor")]
        [HttpGet("notify")]
        public IActionResult NotifyDonors()
        {
            try
            {
                var centerId = Request.Cookies["CenterId"];
                donorService.SendEmails(_emailSender, centerId);
            }
            catch (Exception)
            {

                throw;
            }
        }



        [Authorize(Roles = "DonationCenterDoctor")]
		[HttpGet("stock")]
		public IActionResult GetBloodStock() {
			try {
				var centerId = int.Parse(Request.Cookies["CenterId"]);
				var bagsStock = employeeService.GetBloodBags(centerId);
				var thromboStock = employeeService.GetThrombocytesStock(centerId);
				var redCellsStock = employeeService.GetRedBloodCellsStock(centerId);
				var plasmaStock = employeeService.GetPlasmaStock(centerId);

				return Ok(CreateFullStock(bagsStock, thromboStock, redCellsStock, plasmaStock));
			} catch (Exception ex) {
				return BadRequest(ex.Message);
			}
		}

		private List<BloodStockViewModel> CreateFullStock(List<BloodBag> bagsStock, List<Thrombocyte> thromboStock, List<RedBloodCell> redCellsStock, List<Plasma> plasmaStock) {
			List<BloodStockViewModel> finalStock = new List<BloodStockViewModel>();
			foreach (BloodBag bag in bagsStock) {
				finalStock.Add(new BloodStockViewModel() {
					ID = bag.Id,
					Type = "Punga de sange",
					Group = bag.BloodType.ToString(),
					Rh = bag.RhType.ToString(),
					Donor = bag.Analysis.Donor.FirstName + " " + bag.Analysis.Donor.LastName,
					Date = bag.Analysis.DateAndTime.ToString(),
					Status = bag.Stage.ToString()
				});
			}

			foreach (Thrombocyte bag in thromboStock) {
				finalStock.Add(new BloodStockViewModel() {
					ID = bag.Id,
					Type = "Trombocite",
					Group = bag.BloodType.ToString(),
					Rh = bag.RhType.ToString(),
					Donor = bag.Analysis.Donor.FirstName + " " + bag.Analysis.Donor.LastName,
					Date = bag.Analysis.DateAndTime.ToString(),
					Status = "Separated"
				});
			}

			foreach (Plasma bag in plasmaStock) {
				finalStock.Add(new BloodStockViewModel() {
					ID = bag.Id,
					Type = "Punga de sange",
					Group = bag.BloodType.ToString(),
					Rh = "-",
					Donor = bag.Analysis.Donor.FirstName + " " + bag.Analysis.Donor.LastName,
					Date = bag.Analysis.DateAndTime.ToString(),
					Status = "Separated"
				});
			}

			foreach (RedBloodCell bag in redCellsStock) {
				finalStock.Add(new BloodStockViewModel() {
					ID = bag.Id,
					Type = "Punga de sange",
					Group = bag.BloodType.ToString(),
					Rh = bag.RhType.ToString(),
					Donor = bag.Analysis.Donor.FirstName + " " + bag.Analysis.Donor.LastName,
					Date = bag.Analysis.DateAndTime.ToString(),
					Status = "Separated"
				});
			}

			return finalStock;
		}


	}
}