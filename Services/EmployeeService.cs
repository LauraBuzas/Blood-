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

                var allRequests = uow.DoctorRequestRepository.GetAll()
                                .Include(r => r.Patient)
                                .ThenInclude(p => p.Doctor)
                                .ThenInclude(d => d.Hospital)
                                .ThenInclude(h => h.Address)
                                .OrderByDescending(r => r.EmergencyLevel)
                                .ThenBy(r => r.DateOfRequest);

                List<Request> requestsForCenter = new List<Request>();
                foreach(var request in allRequests)
                {
                    if(request.Patient.Doctor.Hospital.Address.County==center.Address.County && request.ReceivedQuantity!=request.RequestedQuantity)
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
                    .Include(bb => bb.Center)
					.Where(bb => (bb.Status!=BloodBagStatus.Destroyed && bb.Status!=BloodBagStatus.Rejected && bb.Stage!=BloodBagStage.Sent) && bb.CenterId == centerId)
					.ToList();
				
			}
		}


        public void ChangeStatus(BloodBag bloodBag)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
     
                if (bloodBag.Status == BloodBagStatus.Waiting)
                {
                    bloodBag.Status = BloodBagStatus.Accepted;
                    bloodBag.Stage = BloodBagStage.Qualification;
                }
                uow.BloodBagRepository.Update(bloodBag);
                uow.Save();
            }
        }

        public void ChangeStatusReject(BloodBag bloodBag)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {

                bloodBag.Status = BloodBagStatus.Rejected;
                bloodBag.Stage = BloodBagStage.Qualification;
               
                uow.BloodBagRepository.Update(bloodBag);
                uow.Save();
            }
        }

        public void UpdateBloodBag(BloodBag bloodBag)
        {
            using(UnitOfWork uow =new UnitOfWork())
            {
                uow.BloodBagRepository.Update(bloodBag);
                uow.Save();
            }
        }

        public void UpdateThrombocyte(Thrombocyte thrombocyte)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.ThrombocyteRepository.Update(thrombocyte);
                uow.Save();
            }
        }

        public void UpdatePlasma(Plasma plasma)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.PlasmaRepository.Update(plasma);
                uow.Save();
            }
        }

        public void UpdateRedBloodCell(RedBloodCell redBloodCell)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.RedBloodCellRepository.Update(redBloodCell);
                uow.Save();
            }
        }

        public void SeparateBloodBag(BloodBag bloodBag,Thrombocyte t,Plasma p, RedBloodCell r)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {
                bloodBag.Stage = BloodBagStage.Separation;
                bloodBag.Status = BloodBagStatus.Destroyed;
                uow.BloodBagRepository.Update(bloodBag);
                uow.ThrombocyteRepository.Add(t);
                uow.PlasmaRepository.Add(p);
                uow.RedBloodCellRepository.Add(r);
                uow.Save();
            }
        }

		public List<Thrombocyte> GetThrombocytesStock(int centerId) {
			using (UnitOfWork uow = new UnitOfWork()) {
				return uow.ThrombocyteRepository
					.GetAll()
                    .Include(bb => bb.Analysis.Donor)
                    .Include(bb => bb.Center)
                    .Where(t => t.CenterId == centerId && t.Status!=ComponentStatus.Sent)
					.ToList();

			}
		}

		public List<RedBloodCell> GetRedBloodCellsStock(int centerId) {
			using (UnitOfWork uow = new UnitOfWork()) {
				return uow.RedBloodCellRepository
					.GetAll()
                    .Include(bb => bb.Analysis.Donor)
                    .Include(bb => bb.Center)
                    .Where(rbc => rbc.CenterId == centerId && rbc.Status!=ComponentStatus.Sent)
					.ToList();

			}
		}

		public List<Plasma> GetPlasmaStock(int centerId) {
			using (UnitOfWork uow = new UnitOfWork()) {
				return uow.PlasmaRepository
					.GetAll()
                    .Include(bb => bb.Analysis.Donor)
                    .Include(bb => bb.Center)
                    .Where(p => p.CenterId == centerId && p.Status != ComponentStatus.Sent)
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
            dbAnalysis.RejectedOtherCauses = analysis.RejectedOtherCauses;
            dbAnalysis.Observations = analysis.Observations;
            dbAnalysis.DateAndTime = DateTime.Now;
            uow.MedicalAnalysisRepository.Update(dbAnalysis);
            uow.Save();
        }

        public bool IsNotValidBloodBag(MedicalAnalysis analysis)
        {
            var donorHasADisease = analysis.Sifilis || analysis.HTLV || analysis.HIV || analysis.HepatitisB || analysis.HepatitisB || analysis.HTLV || analysis.ALTLevel;

            return donorHasADisease || analysis.RejectedOtherCauses;
        }

        public List<RedBloodCell> GetRedBloodCellsForRequest(int centerId,string rh, string bloodType)
        {
            List<RedBloodCell> redBloodCells = new List<RedBloodCell>();
            var available = GetRedBloodCellsStock(centerId);
            foreach(var redBloodCell in available)
            {
                if (redBloodCell.BloodType.ToString() == bloodType && redBloodCell.RhType.ToString() == rh)
                    redBloodCells.Add(redBloodCell);
            }
            return redBloodCells;
        }

        public List<Thrombocyte> GetThrombocytesForRequest(int centerId, string rh, string bloodType)
        {
            List<Thrombocyte> thrombocytes = new List<Thrombocyte>();
            var available = GetThrombocytesStock(centerId);
            foreach (var thrombocyte in available)
            {
                if (thrombocyte.BloodType.ToString() == bloodType && thrombocyte.RhType.ToString() == rh)
                    thrombocytes.Add(thrombocyte);
            }
            return thrombocytes;
        }

        public List<BloodBag> GetBloodBagsForRequest(int centerId, string rh, string bloodType)
        {
            List<BloodBag> bloodBags = new List<BloodBag>();
            var available = GetBloodBags(centerId);
            foreach (var bag in available)
            {
                if (bag.BloodType.ToString() == bloodType && bag.RhType.ToString() == rh)
                    bloodBags.Add(bag);
            }
            return bloodBags;
        }

        public List<Plasma> GetPlasmaForRequest(int centerId, string bloodType)
        {
            List<Plasma> plasmas = new List<Plasma>();
            var available = GetPlasmaStock(centerId);
            foreach (var plasma in available)
            {
                if (plasma.BloodType.ToString() == bloodType)
                    plasmas.Add(plasma);
            }
            return plasmas;
        }

        public void AcceptBloodBag(Request doctorRequest, int centerId, string rh, string bloodType, int quatityNeeded)
        {
            var availableBloodBags = GetBloodBagsForRequest(centerId,rh,bloodType).OrderBy(b => b.Date).ToList();
            var availableQuantity = availableBloodBags.Count;
            if (availableQuantity == 0)
                throw new Exception("Nu exista pungi de sange in centru");

            int sentQuantity = 0;
            if (availableQuantity > quatityNeeded)
                sentQuantity = quatityNeeded;
            else sentQuantity = availableQuantity;
            doctorRequest.ReceivedQuantity += sentQuantity;
            if (doctorRequest.ReceivedQuantity == doctorRequest.RequestedQuantity)
                doctorRequest.Status = RequestStatus.Completed;

            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.DoctorRequestRepository.Update(doctorRequest);
                uow.Save();
                for (int i = 0; i < sentQuantity; i++)
                {
                    availableBloodBags[i].Stage = BloodBagStage.Sent;
                    uow.BloodBagRepository.Update(availableBloodBags[i]);
                }
                uow.Save();
            }
        }

        public void AcceptThrombocytes(Request doctorRequest, int centerId, string rh, string bloodType, int quatityNeeded)
        {
            var availableThrombocytes = GetThrombocytesForRequest(centerId,rh,bloodType).OrderBy(t=>t.ExpirationDateAndTime).ToList();
            var availableQuantity = availableThrombocytes.Count;
            if (availableQuantity == 0)
                throw new Exception("Nu exista trombocite in centru");

            int sentQuantity = 0;
            if (availableQuantity > quatityNeeded)
                sentQuantity = quatityNeeded;
            else sentQuantity = availableQuantity;
            doctorRequest.ReceivedQuantity += sentQuantity;
            if (doctorRequest.ReceivedQuantity == doctorRequest.RequestedQuantity)
                doctorRequest.Status = RequestStatus.Completed;

            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.DoctorRequestRepository.Update(doctorRequest);
                for (int i = 0; i < sentQuantity; i++)
                {
                    availableThrombocytes[i].Status = ComponentStatus.Sent;
                    uow.ThrombocyteRepository.Update(availableThrombocytes[i]);
                }
                uow.Save();
            }
        }

        public void AcceptPlasma(Request doctorRequest, int centerId, string bloodType, int quatityNeeded)
        {
            var availablePlasma = GetPlasmaForRequest(centerId,bloodType).OrderBy(t => t.ExpirationDateAndTime).ToList();
            var availableQuantity = availablePlasma.Count;
            if (availableQuantity == 0)
                throw new Exception("Nu exista plasma in centru");

            int sentQuantity = 0;
            if (availableQuantity > quatityNeeded)
                sentQuantity = quatityNeeded;
            else sentQuantity = availableQuantity;
            doctorRequest.ReceivedQuantity += sentQuantity;
            if (doctorRequest.ReceivedQuantity == doctorRequest.RequestedQuantity)
                doctorRequest.Status = RequestStatus.Completed;

            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.DoctorRequestRepository.Update(doctorRequest);
                for (int i = 0; i < sentQuantity; i++)
                {
                    availablePlasma[i].Status = ComponentStatus.Sent;
                    uow.PlasmaRepository.Update(availablePlasma[i]);
                }
                uow.Save();
            }
        }

        public void AcceptRedBloodCells(Request doctorRequest, int centerId, string rh,string bloodType, int quatityNeeded)
        {
            var availableRedBloodCells = GetRedBloodCellsForRequest(centerId,rh,bloodType).OrderBy(rb => rb.ExpirationDateAndTime).ToList();
            var availableQuantity = availableRedBloodCells.Count;
            if (availableQuantity == 0)
                throw new Exception("Nu exista globule rosii in centru");

            int sentQuantity = 0;
            if (availableQuantity > quatityNeeded)
                sentQuantity = quatityNeeded;
            else sentQuantity = availableQuantity;
            doctorRequest.ReceivedQuantity += sentQuantity;
            if (doctorRequest.ReceivedQuantity == doctorRequest.RequestedQuantity)
                doctorRequest.Status = RequestStatus.Completed;

            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.DoctorRequestRepository.Update(doctorRequest);
                for (int i = 0; i < sentQuantity; i++)
                {
                    availableRedBloodCells[i].Status = ComponentStatus.Sent;
                    uow.RedBloodCellRepository.Update(availableRedBloodCells[i]);
                }
                uow.Save();
            }
        }

        public void test()
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var x =uow.BloodBagRepository.GetAll().GroupBy(b => new { b.BloodType, b.RhType }).Select(b => new { BloodType = b.Key.BloodType, RhType = b.Key.RhType, Count = b.Count() }).ToList();
            }
        }

    }
}
