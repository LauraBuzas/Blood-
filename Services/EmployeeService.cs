using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services
{
    public class EmployeeService
    {
        public Employee AddEmployee(Employee employee)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.EmployeeRepository.Add(employee);
                uow.Save();
                return employee;
            }
        }

        public List<Employee> GetEmployeesFromCenter(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.EmployeeRepository.GetAll().Where(e => e.CenterId == id).ToList();
            }
        }

        public ApplicationUser GetUserForEmployee(string employeeId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.ApplicationUserRepository
                    .GetByFunc(a => a.Id == employeeId);

            }
        }

        public void DeleteEmployee(string email)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                ApplicationUser user = uow.ApplicationUserRepository.GetByFunc(u => u.Email == email);
                Employee employee = uow.EmployeeRepository.GetByFunc(d => d.Id == user.Id);
                uow.EmployeeRepository.Delete(employee);
                uow.ApplicationUserRepository.Delete(user);
                uow.Save();
            }
        }

        public int GetCenterIdForCenterDoctor(String CenterDoctorId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.EmployeeRepository.GetAll()
                    .Include(ca => ca.Center)
                    .Where(ca => ca.Id == CenterDoctorId)
                    .FirstOrDefault()
                    .Center
                    .Id;
            }
        }

        public List<Request> GetRequests(int centerId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
               
                var center = uow.CenterRepository.GetAll()
                        .Include("Address")
                        .FirstOrDefault(c => c.Id == centerId);
                var centerAddress = center.Address;

                var allRequest = uow.DoctorRequestRepository.GetAll()
                                .Include(r => r.Patient)
                                .ThenInclude(p => p.Doctor)
                                .ThenInclude(d => d.Hospital)
                                .ThenInclude(h => h.Address)
                                .OrderByDescending(r => r.EmergencyLevel)
                                .ThenBy(r => r.DateOfRequest);

                List<Request> requestsForCenter = new List<Request>();
                foreach(var request in allRequest)
                {
                    if(request.Patient.Doctor.Hospital.Address.County==center.Address.County)
                    {
                        requestsForCenter.Add(request);
                    }
                }
                return requestsForCenter;
    
            }

        }


        public void DonateBlood(string donorCnp, string bloodType, string rh, int centerId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var donor = uow.DonorRepository.GetAll().Where(d => d.CNP == donorCnp).FirstOrDefault();

                MedicalAnalysis medicalAnalysis = new MedicalAnalysis();

                BloodBag bloodBag = new BloodBag
                {
                    Status = BloodBagStatus.Waiting,
                    Stage = BloodBagStage.Sampling,
                    BloodType = (BloodTypes)Enum.Parse(typeof(BloodTypes), bloodType.ToUpper()),
                    RhType = (RhTypes)Enum.Parse(typeof(RhTypes), rh.ToUpper()),
                    CenterId = centerId,
                    Date = DateTime.Now
                };
                uow.BloodBagRepository.Add(bloodBag);
                uow.Save();

                medicalAnalysis.BloodBag = bloodBag;
                medicalAnalysis.Donor = donor;
                uow.MedicalAnalysisRepository.Add(medicalAnalysis);
                uow.Save();
            }
        }


        public void FillAnalysis(MedicalAnalysis analysis, string cnp)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var donor = uow.DonorRepository.GetAll().Where(d => d.CNP == cnp).FirstOrDefault();
                var donorAnalysis = uow.MedicalAnalysisRepository.GetAll().Include(da => da.BloodBag).Where(ma => ma.DonorId == donor.Id).FirstOrDefault();
                CopyAnalysisDetailsToDb(uow, donorAnalysis, analysis);

                if (IsNotValidBloodBag(analysis))
                {
                    donorAnalysis.BloodBag.Status = BloodBagStatus.Rejected;
                    uow.BloodBagRepository.Update(donorAnalysis.BloodBag);
                    uow.Save();
                    throw new Exception("Unusable Blood Bag");
                }

                donorAnalysis.BloodBag.Status = BloodBagStatus.Accepted;
                uow.BloodBagRepository.Update(donorAnalysis.BloodBag);
                uow.Save();
            }

        }


		public List<BloodBag> GetBloodBags(int centerId) {
			using (UnitOfWork uow = new UnitOfWork()) {
				return uow.BloodBagRepository
					.GetAll()
					.Include(bb => bb.Analysis.Donor)
					.Where(bb => bb.Stage == BloodBagStage.Qualification && bb.CenterId == centerId)
					.ToList();
				
			}
		}

		public List<Thrombocyte> GetThrombocytesStock(int centerId) {
			using (UnitOfWork uow = new UnitOfWork()) {
				return uow.ThrombocyteRepository
					.GetAll()
					.Where(t => t.CenterId == centerId)
					.ToList();

			}
		}

		public List<RedBloodCell> GetRedBloodCellsStock(int centerId) {
			using (UnitOfWork uow = new UnitOfWork()) {
				return uow.RedBloodCellRepository
					.GetAll()
					.Where(rbc => rbc.CenterId == centerId)
					.ToList();

			}
		}

		public List<Plasma> GetPlasmaStock(int centerId) {
			using (UnitOfWork uow = new UnitOfWork()) {
				return uow.PlasmaRepository
					.GetAll()
					.Where(p => p.CenterId == centerId)
					.ToList();

			}
		}

		public void CopyAnalysisDetailsToDb(UnitOfWork uow, MedicalAnalysis dbAnalysis, MedicalAnalysis analysis)
        {
            dbAnalysis.ALTLevel = analysis.ALTLevel;
            dbAnalysis.HepatitisB = analysis.HepatitisB;
            dbAnalysis.HepatitisC = analysis.HepatitisC;
            dbAnalysis.HIV = analysis.HIV;
            dbAnalysis.HTLV = analysis.HTLV;
            dbAnalysis.Sifilis = analysis.Sifilis;
            dbAnalysis.DateAndTime = analysis.DateAndTime;
            uow.MedicalAnalysisRepository.Update(dbAnalysis);
            uow.Save();
        }

        public bool IsNotValidBloodBag(MedicalAnalysis analysis)
        {
            var isNotValidBloodBag = analysis.Sifilis || analysis.HTLV || analysis.HIV || analysis.HepatitisB || analysis.HepatitisB || analysis.HTLV || analysis.ALTLevel;

            return isNotValidBloodBag;
        }

        //public void 
    }
}
