﻿using BloodPlus.ModelViews;
using DatabaseAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using System;
using System.Collections.Generic;

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
                    Address address = Mappers.MapperAddPatient.ToAddressDb(doctorRequest.Patient);
                    patient = Mappers.MapperAddPatient.ToPatientDb(doctorRequest.Patient);
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



    }
}
