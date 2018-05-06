using BloodPlus.Mappers;
using BloodPlus.ModelViews;
using DatabaseAccess.Models;
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
    
    public class DoctorsController : Controller
    {
        DoctorsService doctorsService;
        PatientService patientService;

        public DoctorsController(DoctorsService doctorsService,PatientService patientService)
        {
            this.doctorsService = doctorsService;
            this.patientService = patientService;
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
                doctorsService.AddRequest(request);          
                return Ok(request);

            }catch(Exception ex)
            {
                return BadRequest("Can't add request");
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



    }
}
