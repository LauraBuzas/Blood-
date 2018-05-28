using BloodPlus.Hubs;
using BloodPlus.Mappers;
using BloodPlus.ModelViews;
using DatabaseAccess.Models;
using Microsoft.AspNet.SignalR.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BloodPlus.Controllers
{
    [Produces("application/json")]
    [Route("doctors")]
    
    public class DoctorsController:Controller
    {
        DoctorsService doctorsService;
        PatientService patientService;
        Broadcaster broadcaster;
       
        public DoctorsController(DoctorsService doctorsService,PatientService patientService,Broadcaster broadcaster)
           
        {
            this.doctorsService = doctorsService;
            this.patientService = patientService;
            this.broadcaster = broadcaster;
        }

        [Authorize(Roles = "HospitalAdmin")]
        [HttpGet]
        public IActionResult GetDoctors()
        {
            var hospitalId=Request.Cookies["HospitalId"];
            List<Doctor> doctors = doctorsService.GetDoctors(Int32.Parse(hospitalId));
            List<DoctorGetModelView> doctorsView = new List<DoctorGetModelView>();
            foreach(var doctor in doctors)
            {
                var user = doctorsService.GetUserForDoctor(doctor.Id);
                doctorsView.Add(Mappers.MapperRegisterDoctor.ToDoctorGet(doctor, user));
            }
            return Ok(doctorsView);
        }

        [Authorize(Roles = "HospitalAdmin")]
        [HttpDelete]
        public IActionResult DeleteDoctorByEmail([FromBody] DoctorDeleteModelView doctorDelete)
        {
            try
            {
      
                doctorsService.DeleteDoctor(doctorDelete.Email);
         
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Can't delete doctor with email "+doctorDelete.Email);
            }
        }

        [Authorize(Roles = "HospitalDoctor")]
        [HttpPost("addRequest")]
        public IActionResult AddDoctorRequest([FromBody] DoctorRequestViewModel doctorRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest("Can't add request");

            try
            {
                Patient patient = new Patient();
                if (doctorRequest.Patient.LastName == null)
                {
                    patient = patientService.GetPatientByCNP(doctorRequest.Patient.CNP);
                    patient.Status = PatientStatus.INTERNAT;
                }
                else
                {
                    Address address = Mappers.MapperPatient.ToAddressDb(doctorRequest.Patient);
                    patient = Mappers.MapperPatient.ToPatientDb(doctorRequest.Patient);
                    patient.Status = PatientStatus.INTERNAT;
                    var id = Request.Cookies["UserId"];
                    Doctor doctor = doctorsService.GetDoctorById(id);
                    patient.IdDoctor = doctor.Id;
                    patientService.AddPatient(patient,address);
                }

                Request request = Mappers.MapperDoctorRequest.ToDoctorRequestDb(doctorRequest);
                request.IdPatient = patient.Id;
                request = doctorsService.AddRequest(request);

                doctorRequest.dateOfRequest = request.DateOfRequest;
                doctorRequest.id = request.Id;

                EmployeeRequestModelView employeeRequest = Mappers.MapperDoctorRequest.ToEmployeeRequest(request);
                this.broadcaster.Clients.Group("DonationCenterDoctor").SendRequest(employeeRequest);

                return Ok(request);

            }catch(Exception ex)
            {
                return BadRequest("Can't add request");
            }
        }

        //[Authorize(Roles = "HospitalDoctor")]
        //[HttpPost("addPatient")]
        //public IActionResult AddPatient([FromBody] PatientGetExtendedModelView patientView)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest("Can't add request");

        //    try
        //    {
        //        Address address = Mappers.MapperPatient.ToAddress(patientView);
        //        Patient patient = Mappers.MapperPatient.ToPatient(patientView);
        //        patientService.AddPatient(patient, address);
        //        return Ok(patientView); //patient
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Can't add request");
        //    }
        //}

        [Authorize(Roles = "HospitalDoctor")]
        [HttpPost("changePatientStatus")]
        public IActionResult ChangePatientStatus([FromBody] PatientChangeStatus patientChange)
        {
            try
            {
                string cnp = patientChange.CNP;
                Patient currrentPatient = patientService.GetPatientByCNP(cnp);

                string newStatus = patientChange.Status;
                if (newStatus.Equals("INTERNAT"))
                {
                    currrentPatient.Status = PatientStatus.INTERNAT;
                }else if (newStatus.Equals("EXTERNAT"))
                        {
                            currrentPatient.Status = PatientStatus.EXTERNAT;
                        }
                        else if(newStatus.Equals("DECEDAT"))
                        {
                            currrentPatient.Status = PatientStatus.DECEDAT;
                        }
                patientService.UpdatePatient(currrentPatient);

                //getAll
                var id = Request.Cookies["UserId"];
                var patients = patientService.GetHospitalizedPatientsForDoctor(id);
                List<PatientGetExtendedModelView> patientsReturned = new List<PatientGetExtendedModelView>();
                foreach (var patient in patients)
                {
                    Address address = doctorsService.GetAddressForPatient(patient.IdAddress);
                    patientsReturned.Add(Mappers.MapperPatient.ToPatientExtendedGet(patient, address));
                }
                return Ok(patientsReturned);
            }
            catch (Exception ex)
            {
                return BadRequest("Can't change status of patient");
            }
        }

        [Authorize(Roles = "HospitalDoctor")]
        [HttpGet("hospitalized")]
        public IActionResult GetHospitalizedPatients()
        {
            try
            {
             
                var id= Request.Cookies["UserId"];
                var patients = patientService.GetHospitalizedPatientsForDoctor(id);
                List<PatientGetViewModel> patientsReturned = new List<PatientGetViewModel>();
                foreach(var patient in patients)
                {
                    patientsReturned.Add(Mappers.MapperPatient.ToPatientGet(patient));
                }
                
                return Ok(patientsReturned);

            }catch(Exception ex)
            {
                return BadRequest("Can't get hospitalized patients");
            }
        }

        [Authorize(Roles = "HospitalDoctor")]
        [HttpGet("hospitalized/details")]
        public IActionResult GetHospitalizedPatientsDetailed()
        {
            try
            {

                var id = Request.Cookies["UserId"];
                var patients = patientService.GetHospitalizedPatientsForDoctor(id);
               

                List<PatientGetExtendedModelView> patientsReturned = new List<PatientGetExtendedModelView>();
                foreach (var patient in patients)
                {
                    Address address = doctorsService.GetAddressForPatient(patient.IdAddress);
                    patientsReturned.Add(Mappers.MapperPatient.ToPatientExtendedGet(patient,address));
                }
                return Ok(patientsReturned);

            }
            catch (Exception ex)
            {
                return BadRequest("Can't get hospitalized patients");
            }
        }

        [Authorize(Roles = "HospitalDoctor")]
        [HttpGet("requests")]
        public IActionResult GetRequests()
        {
            try
            {
                var id = Request.Cookies["UserId"];
                var requests = doctorsService.GetRequests(id);
                List<DoctorRequestViewModel> requestsReturned = requests.Select(r => MapperDoctorRequest.ToDoctorRequestViewModel(r)).ToList();

                return Ok(requestsReturned);

            }
            catch (Exception ex)
            {
                return BadRequest("Can't get doctor requests");
            }
        }


        [Authorize(Roles = "HospitalDoctor")]
        [HttpGet("bloodqty")]
        public IActionResult GetBloodQuantity()
        {
            try
            {
                var centers = doctorsService.GetCenters();
                var addresses = doctorsService.GetCenterAddresses();
                var bloodbags = doctorsService.GetBloodBagsQty();
                var plasmas = doctorsService.GetPlasmasQty();
                var thrombocytes = doctorsService.GetThrombocyteQty();
                var redcells = doctorsService.GetRedBloodCellQty();


                List<CenterBloodQuantityViewModel> centersqty = new List<CenterBloodQuantityViewModel>();
                foreach(Center c in centers)
                {
                    var centerbloodbags = (from bags in bloodbags
                                           where bags.CenterId == c.Id
                                           select bags);
                    var centeraddres = (from a in addresses
                                       where a.Id == c.IdAddress
                                       select  a).First();

                    var bbags = (from bag in centerbloodbags
                                 group bag by new { bag.BloodType, bag.RhType } into grp
                                 select new { grp.Key.BloodType, grp.Key.RhType, qty = grp.Count() }).ToList();

                    foreach(var bag in bbags)
                    {
                        CenterBloodQuantityViewModel cbq = new CenterBloodQuantityViewModel();
                        cbq.CenterName = c.CenterName;
                        cbq.Address = centeraddres.ToString();
                        cbq.Component = "Sange neseparat";
                        cbq.Group = bag.BloodType.ToString();
                        cbq.Rh = bag.RhType.ToString();
                        cbq.Quantity = bag.qty;

                        centersqty.Add(cbq);

                    }

                    var centerplasmas = (from plasma in plasmas
                                         where plasma.CenterId == c.Id
                                         select plasma);


                    var cplasmas = (from p in centerplasmas
                                 group p by new { p.BloodType} into grp
                                 select new { grp.Key.BloodType, qty = grp.Count() }).ToList();

                    foreach (var p in cplasmas)
                    {
                        CenterBloodQuantityViewModel cbq = new CenterBloodQuantityViewModel();
                        cbq.CenterName = c.CenterName;
                        cbq.Address = centeraddres.ToString();
                        cbq.Component = "Plasma";
                        cbq.Group = p.BloodType.ToString();
                        
                        cbq.Quantity = p.qty;

                        centersqty.Add(cbq);

                    }

                    var centerthr = (from thr in thrombocytes
                                     where thr.CenterId == c.Id
                                     select thr);

                    var thrs = (from t in centerthr
                                 group t by new { t.BloodType, t.RhType } into grp
                                 select new { grp.Key.BloodType, grp.Key.RhType, qty = grp.Count() }).ToList();

                    foreach (var t in thrs)
                    {
                        CenterBloodQuantityViewModel cbq = new CenterBloodQuantityViewModel();
                        cbq.CenterName = c.CenterName;
                        cbq.Address = centeraddres.ToString();
                        cbq.Component = "Trombocite";
                        cbq.Group = t.BloodType.ToString();
                        cbq.Rh = t.RhType.ToString();
                        cbq.Quantity = t.qty;

                        centersqty.Add(cbq);

                    }

                    var centerredcells = (from rc in redcells
                                          where rc.CenterId == c.Id
                                          select rc);

                    var rcs = (from r in centerredcells
                                 group r by new { r.BloodType, r.RhType } into grp
                                 select new { grp.Key.BloodType, grp.Key.RhType, qty = grp.Count() }).ToList();

                    foreach (var r in rcs)
                    {
                        CenterBloodQuantityViewModel cbq = new CenterBloodQuantityViewModel();
                        cbq.CenterName = c.CenterName;
                        cbq.Address = centeraddres.ToString();
                        cbq.Component = "Globule rosii";
                        cbq.Group = r.BloodType.ToString();
                        cbq.Rh = r.RhType.ToString();
                        cbq.Quantity = r.qty;

                        centersqty.Add(cbq);

                    }

                }
                //var requests = doctorsService.GetRequests(id);
               // List<DoctorRequestViewModel> requestsReturned = requests.Select(r => MapperDoctorRequest.ToDoctorRequestViewModel(r)).ToList();


                return Ok(centersqty);

            }
            catch (Exception ex)
            {
                return BadRequest("Can't get centers'blood quantity.");
            }
        }


    }
}
