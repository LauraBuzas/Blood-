using System;
using System.Collections.Generic;
using System.Linq;
using BloodPlus.Hubs;
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
        DoctorsService doctorService;
        Broadcaster broadcaster;

        public EmployeeController(EmployeeService employeeService,DoctorsService doctorService, Broadcaster broadcaster)
        {
            this.employeeService = employeeService;
            this.doctorService = doctorService;
            this.broadcaster = broadcaster;
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
            List<EmployeeRequestModelView> requestViewModels = new List<EmployeeRequestModelView>();
            foreach(var request in requests)
            {
                requestViewModels.Add(Mappers.MapperDoctorRequest.ToEmployeeRequest(request));
            }
            return Ok(requestViewModels);
        }

        [HttpPost("accept")]
        public IActionResult AcceptRequest([FromBody]EmployeeRequestModelView employeeRequestModelView)
        {
            var centerId = int.Parse(Request.Cookies["CenterId"]);
            string component = employeeRequestModelView.Component;

            Request doctorRequest = doctorService.GetDoctorRequest(employeeRequestModelView.Id);

            try
            {
                if (employeeRequestModelView.Component == "Sange neseparat")
                {
                    employeeService.AcceptBloodBag(doctorRequest, centerId, employeeRequestModelView.Rh, employeeRequestModelView.BloodType, employeeRequestModelView.QuantityNeeded);
                }
                else if (employeeRequestModelView.Component == "Trombocite")
                {
                    employeeService.AcceptThrombocytes(doctorRequest, centerId, employeeRequestModelView.Rh, employeeRequestModelView.BloodType, employeeRequestModelView.QuantityNeeded);

                }
                else if (employeeRequestModelView.Component == "Plasma")
                {
                    employeeService.AcceptPlasma(doctorRequest, centerId, employeeRequestModelView.BloodType, employeeRequestModelView.QuantityNeeded);
                }
                else if (employeeRequestModelView.Component == "Celule rosii")
                {
                    employeeService.AcceptRedBloodCells(doctorRequest, centerId, employeeRequestModelView.Rh, employeeRequestModelView.BloodType, employeeRequestModelView.QuantityNeeded);
                }
              
                this.broadcaster.Clients.Group("HospitalDoctor").AcceptRequest();          
                return Ok(employeeRequestModelView);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("grouped-stock")]
        public IActionResult GetBloodStockForCenter()
        {
            var centerId = int.Parse(Request.Cookies["CenterId"]);
            var bagsStock = employeeService.GetBloodBags(centerId);
            var thromboStock = employeeService.GetThrombocytesStock(centerId);
            var redCellsStock = employeeService.GetRedBloodCellsStock(centerId);
            var plasmaStock = employeeService.GetPlasmaStock(centerId);

            var groupedBloodBags=bagsStock.AsQueryable().GroupBy(b => new { b.BloodType, b.RhType })
                                .Select(b => new CenterBloodStockModelView { Component="Punga de sange", BloodType = b.Key.BloodType.ToString(), Rh = b.Key.RhType.ToString(), Quantity = b.Count() })
                                .ToList();
            var groupedThrombo = thromboStock.AsQueryable().GroupBy(b => new { b.BloodType, b.RhType })
                               .Select(b => new CenterBloodStockModelView { Component="Trombocite", BloodType = b.Key.BloodType.ToString(), Rh = b.Key.RhType.ToString(), Quantity = b.Count() })
                               .ToList();
            var groupedRedCells = redCellsStock.AsQueryable().GroupBy(b => new { b.BloodType, b.RhType })
                              .Select(b => new CenterBloodStockModelView {Component="Globule rosii", BloodType = b.Key.BloodType.ToString(), Rh = b.Key.RhType.ToString(), Quantity = b.Count() })
                              .ToList();
            var groupedPlasma = redCellsStock.AsQueryable().GroupBy(b => new { b.BloodType })
                           .Select(b => new CenterBloodStockModelView { Component="Plasma", BloodType = b.Key.BloodType.ToString(), Rh = "", Quantity = b.Count() })
                           .ToList();
            var fullStock = groupedBloodBags.Union(groupedPlasma).Union(groupedRedCells).Union(groupedThrombo).ToList();

            return Ok(fullStock);
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
		[HttpGet("stock")]
		public IActionResult GetBloodStock() {
			try {
				var centerId = int.Parse(Request.Cookies["CenterId"]);
				var bagsStock = employeeService.GetBloodBags(centerId);
				var thromboStock = employeeService.GetThrombocytesStock(centerId);
				var redCellsStock = employeeService.GetRedBloodCellsStock(centerId);
				var plasmaStock = employeeService.GetPlasmaStock(centerId);

                var finalStock = CreateFullStock(bagsStock, thromboStock, redCellsStock, plasmaStock);

                return Ok(finalStock);
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
                    CNP = bag.Analysis.Donor.CNP,
					Donor = bag.Analysis.Donor.FirstName + " " + bag.Analysis.Donor.LastName,
					Date = bag.Analysis.DateAndTime.ToString(),
					Status = bag.Status.ToString()
				});
			}

			foreach (Thrombocyte bag in thromboStock) {
				finalStock.Add(new BloodStockViewModel() {
					ID = bag.Id,
					Type = "Trombocite",
					Group = bag.BloodType.ToString(),
					Rh = bag.RhType.ToString(),
					Donor = bag.Analysis.Donor.FirstName + " " + bag.Analysis.Donor.LastName,
                    CNP = bag.Analysis.Donor.CNP,
					Date = bag.Analysis.DateAndTime.ToString(),
					Status = "Separated"
				});
			}

			foreach (Plasma bag in plasmaStock) {
				finalStock.Add(new BloodStockViewModel() {
					ID = bag.Id,
					Type = "Plasma",
					Group = bag.BloodType.ToString(),
					Rh = "-",
					Donor = bag.Analysis.Donor.FirstName + " " + bag.Analysis.Donor.LastName,
                    CNP = bag.Analysis.Donor.CNP,
                    Date = bag.Analysis.DateAndTime.ToString(),
					Status = "Separated"
				});
			}

			foreach (RedBloodCell bag in redCellsStock) {
				finalStock.Add(new BloodStockViewModel() {
					ID = bag.Id,
					Type = "Globule rosii",
					Group = bag.BloodType.ToString(),
					Rh = bag.RhType.ToString(),
					Donor = bag.Analysis.Donor.FirstName + " " + bag.Analysis.Donor.LastName,
                    CNP = bag.Analysis.Donor.CNP,
                    Date = bag.Analysis.DateAndTime.ToString(),
					Status = "Separated"
				});
			}

			return finalStock;
		}

        [Authorize(Roles = "DonationCenterDoctor")]
        [HttpPost("status")]
        public IActionResult ChangeStatus([FromBody] ChangeStatusViewModel changeStatusViewModel)
        {
            try
            {
                var centerId = int.Parse(Request.Cookies["CenterId"]);
                var cnp = changeStatusViewModel.CNP;
                var date = changeStatusViewModel.Date;
                List<BloodBag> bloodBags = employeeService.GetBloodBags(centerId);
                foreach(BloodBag b in bloodBags)
                {
                    if (b.Analysis.DateAndTime.ToString().Equals(date) && b.Analysis.Donor.CNP.Equals(cnp))
                    {
                        employeeService.ChangeStatus(b);
                        break;
                    }
                }

                //return Ok("Status updated");
                var bagsStock = employeeService.GetBloodBags(centerId);
                var thromboStock = employeeService.GetThrombocytesStock(centerId);
                var redCellsStock = employeeService.GetRedBloodCellsStock(centerId);
                var plasmaStock = employeeService.GetPlasmaStock(centerId);

                return Ok(CreateFullStock(bagsStock, thromboStock, redCellsStock, plasmaStock));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "DonationCenterDoctor")]
        [HttpPost("statusReject")]
        public IActionResult ChangeStatusRejected([FromBody] ChangeStatusViewModel changeStatusViewModel)
        {
            try
            {
                var centerId = int.Parse(Request.Cookies["CenterId"]);
                var cnp = changeStatusViewModel.CNP;
                var date = changeStatusViewModel.Date;
                List<BloodBag> bloodBags = employeeService.GetBloodBags(centerId);
                foreach (BloodBag b in bloodBags)
                {
                    if (b.Analysis.DateAndTime.ToString().Equals(date) && b.Analysis.Donor.CNP.Equals(cnp))
                    {
                        employeeService.ChangeStatusReject(b);
                        break;
                    }
                }

                //return Ok("Status updated");
                var bagsStock = employeeService.GetBloodBags(centerId);
                var thromboStock = employeeService.GetThrombocytesStock(centerId);
                var redCellsStock = employeeService.GetRedBloodCellsStock(centerId);
                var plasmaStock = employeeService.GetPlasmaStock(centerId);

                return Ok(CreateFullStock(bagsStock, thromboStock, redCellsStock, plasmaStock));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "DonationCenterDoctor")]
        [HttpPost("update")]
        public IActionResult UpdateBloodBag([FromBody] BloodBagEditViewModel bloodBagEditViewModel)
        {
            try
            {
                var centerId = int.Parse(Request.Cookies["CenterId"]);
                var cnp = bloodBagEditViewModel.CNP;
                var date = bloodBagEditViewModel.Date;
                List<BloodBag> bloodBags = employeeService.GetBloodBags(centerId);
                foreach (BloodBag b in bloodBags)
                {
                    if (b.Analysis.DateAndTime.ToString().Equals(date) && b.Analysis.Donor.CNP.Equals(cnp))
                    {
                        if (bloodBagEditViewModel.BloodType == "A2")
                            b.BloodType = BloodTypes.A2;
                        else if (bloodBagEditViewModel.BloodType == "AB4")
                            b.BloodType = BloodTypes.AB4;
                        else if (bloodBagEditViewModel.BloodType == "B3")
                            b.BloodType = BloodTypes.B3;
                        else if (bloodBagEditViewModel.BloodType == "O1")
                            b.BloodType = BloodTypes.O1;
                        if (bloodBagEditViewModel.Rh == "POZITIV")
                            b.RhType = RhTypes.POZITIV;
                        else if (bloodBagEditViewModel.Rh == "NEGATIV")
                            b.RhType = RhTypes.NEGATIV;

                        employeeService.UpdateBloodBag(b);
                        
                    }
                }
                List<Thrombocyte> thrombocytes = employeeService.GetThrombocytesStock(centerId);
                foreach (Thrombocyte t in thrombocytes)
                {
                    if (t.Analysis.DateAndTime.ToString().Equals(date) && t.Analysis.Donor.CNP.Equals(cnp))
                    {
                        if (bloodBagEditViewModel.BloodType == "A2")
                            t.BloodType = BloodTypes.A2;
                        else if (bloodBagEditViewModel.BloodType == "AB4")
                            t.BloodType = BloodTypes.AB4;
                        else if (bloodBagEditViewModel.BloodType == "B3")
                            t.BloodType = BloodTypes.B3;
                        else if (bloodBagEditViewModel.BloodType == "O1")
                            t.BloodType = BloodTypes.O1;
                        if (bloodBagEditViewModel.Rh == "POZITIV")
                            t.RhType = RhTypes.POZITIV;
                        else if (bloodBagEditViewModel.Rh == "NEGATIV")
                            t.RhType = RhTypes.NEGATIV;

                        employeeService.UpdateThrombocyte(t);

                    }
                }
                List<Plasma> plasma = employeeService.GetPlasmaStock(centerId);
                foreach (Plasma p in plasma)
                {
                    if (p.Analysis.DateAndTime.ToString().Equals(date) && p.Analysis.Donor.CNP.Equals(cnp))
                    {
                        if (bloodBagEditViewModel.BloodType == "A2")
                            p.BloodType = BloodTypes.A2;
                        else if (bloodBagEditViewModel.BloodType == "AB4")
                            p.BloodType = BloodTypes.AB4;
                        else if (bloodBagEditViewModel.BloodType == "B3")
                            p.BloodType = BloodTypes.B3;
                        else if (bloodBagEditViewModel.BloodType == "O1")
                            p.BloodType = BloodTypes.O1;
                       

                        employeeService.UpdatePlasma(p);

                    }
                }
                List<RedBloodCell> redBloodCells = employeeService.GetRedBloodCellsStock(centerId);
                foreach (RedBloodCell r in redBloodCells)
                {
                    if (r.Analysis.DateAndTime.ToString().Equals(date) && r.Analysis.Donor.CNP.Equals(cnp))
                    {
                        if (bloodBagEditViewModel.BloodType == "A2")
                            r.BloodType = BloodTypes.A2;
                        else if (bloodBagEditViewModel.BloodType == "AB4")
                            r.BloodType = BloodTypes.AB4;
                        else if (bloodBagEditViewModel.BloodType == "B3")
                            r.BloodType = BloodTypes.B3;
                        else if (bloodBagEditViewModel.BloodType == "O1")
                            r.BloodType = BloodTypes.O1;
                        if (bloodBagEditViewModel.Rh == "POZITIV")
                            r.RhType = RhTypes.POZITIV;
                        else if (bloodBagEditViewModel.Rh == "NEGATIV")
                            r.RhType = RhTypes.NEGATIV;

                        employeeService.UpdateRedBloodCell(r);

                    }
                }
                var bagsStock = employeeService.GetBloodBags(centerId);
                var thromboStock = employeeService.GetThrombocytesStock(centerId);
                var redCellsStock = employeeService.GetRedBloodCellsStock(centerId);
                var plasmaStock = employeeService.GetPlasmaStock(centerId);

                return Ok(CreateFullStock(bagsStock, thromboStock, redCellsStock, plasmaStock));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "DonationCenterDoctor")]
        [HttpPost("separate")]
        public IActionResult SeparateBloodBag([FromBody] ChangeStatusViewModel changeStatusViewModel)
        {
            try
            {
                var centerId = int.Parse(Request.Cookies["CenterId"]);
                var cnp = changeStatusViewModel.CNP;
                var date = changeStatusViewModel.Date;
                List<BloodBag> bloodBags = employeeService.GetBloodBags(centerId);
                foreach (BloodBag b in bloodBags)
                {
                    if (b.Analysis.DateAndTime.ToString().Equals(date) && b.Analysis.Donor.CNP.Equals(cnp))
                    {
                        var thrombocyte = MapperBloodBag.ToThrombocyte(b);
                        var redBloodCell = MapperBloodBag.ToRedBloodCell(b);
                        var plasma = MapperBloodBag.ToPlasma(b);
                        employeeService.SeparateBloodBag(b, thrombocyte, plasma, redBloodCell);
                        //List<BloodBag> bbList = new List<BloodBag> { b };
                        //List<Thrombocyte> tList = new List<Thrombocyte> { thrombocyte };
                        //List<RedBloodCell> rbcList = new List<RedBloodCell> { redBloodCell };
                        //List<Plasma> pList = new List<Plasma> { plasma };
                        //return Ok(CreateFullStock(bbList,tList,rbcList,pList));
                        var bagsStock = employeeService.GetBloodBags(centerId);
                        var thromboStock = employeeService.GetThrombocytesStock(centerId);
                        var redCellsStock = employeeService.GetRedBloodCellsStock(centerId);
                        var plasmaStock = employeeService.GetPlasmaStock(centerId);

                        return Ok(CreateFullStock(bagsStock, thromboStock, redCellsStock, plasmaStock));
                    }
                }
                List<BloodStockViewModel> finalStock = new List<BloodStockViewModel>();

                return Ok(finalStock);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}