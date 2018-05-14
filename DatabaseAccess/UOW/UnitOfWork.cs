using DatabaseAccess.Data;
using DatabaseAccess.Models;
using DatabaseAccess.Repository;
using System;

namespace DatabaseAccess.UOW
{
    public class UnitOfWork:IDisposable
    {
        private readonly ApplicationDbContext context;

        private IRepository<Doctor> _DoctorRepository;
        private IRepository<Employee> _EmployeeRepository;
        private IRepository<Donor> _DonorRepository;
        private IRepository<HospitalAdmin> _HospitalAdminRepository;
        private IRepository<CenterAdmin> _CenterAdminRepository;
        private IRepository<Address> _AddressRepository;
        private IRepository<ApplicationUser> _ApplicationUserRepository;
        private IRepository<BloodBag> _BloodBagRepository;
		private IRepository<Thrombocyte> _ThrombocyteRepository;
		private IRepository<RedBloodCell> _RedBloodCellRepository;
		private IRepository<Plasma> _PlasmaRepository;
		private IRepository<MedicalAnalysis> _MedicalAnalysisRepository;
        private IRepository<Center> _CenterRepository;
        private IRepository<Hospital> _HospitalRepository;
        private IRepository<Patient> _PatientRepository;
        private IRepository<Request> _DoctorRequestRepository;
        private IRepository<DonorRegistrationForDonation> _DonorRegistrationForDonationRepository;

        public UnitOfWork()
        {
            this.context = new DbContextFactory().CreateDbContext(new string[] { });
        }

        public IRepository<Doctor> DoctorRepository
        {
            get
            {
                if (_DoctorRepository == null)
                    _DoctorRepository = new GenericRepository<Doctor>(context);
                return _DoctorRepository;
            }
        }

        public IRepository<Employee> EmployeeRepository
        {
            get
            {
                if (_EmployeeRepository == null)
                    _EmployeeRepository = new GenericRepository<Employee>(context);
                return _EmployeeRepository;
            }
        }

        public IRepository<Patient> PatientRepository
        {
            get
            {
                if (_PatientRepository == null)
                    _PatientRepository = new GenericRepository<Patient>(context);
                return _PatientRepository;
            }
        }

        public IRepository<Donor> DonorRepository
        {
            get
            {
                if (_DonorRepository == null)
                    _DonorRepository = new GenericRepository<Donor>(context);
                return _DonorRepository;
            }
        }

        public IRepository<MedicalAnalysis> MedicalAnalysisRepository
        {
            get
            {
                if (_MedicalAnalysisRepository == null)
                    _MedicalAnalysisRepository = new GenericRepository<MedicalAnalysis>(context);
                return _MedicalAnalysisRepository;
            }
        }

        public IRepository<BloodBag> BloodBagRepository
        {
            get
            {
                if (_BloodBagRepository == null)
                    _BloodBagRepository = new GenericRepository<BloodBag>(context);
                return _BloodBagRepository;
            }
        }

		public IRepository<Thrombocyte> ThrombocyteRepository {
			get {
				if (_ThrombocyteRepository == null)
					_ThrombocyteRepository = new GenericRepository<Thrombocyte>(context);
				return _ThrombocyteRepository;
			}
		}

		public IRepository<RedBloodCell> RedBloodCellRepository {
			get {
				if (_RedBloodCellRepository == null)
					_RedBloodCellRepository = new GenericRepository<RedBloodCell>(context);
				return _RedBloodCellRepository;
			}
		}

		public IRepository<Plasma> PlasmaRepository {
			get {
				if (_PlasmaRepository == null)
					_PlasmaRepository = new GenericRepository<Plasma>(context);
				return _PlasmaRepository;
			}
		}

		public IRepository<HospitalAdmin> HospitalAdminRepository
        {
            get
            {
                if (_HospitalAdminRepository == null)
                    _HospitalAdminRepository = new GenericRepository<HospitalAdmin>(context);
                return _HospitalAdminRepository;
            }
        }

        public IRepository<Address> AddressRepository
        {
            get
            {
                if (_AddressRepository == null)
                    _AddressRepository = new GenericRepository<Address>(context);
                return _AddressRepository;
            }
        }

        public IRepository<Request> DoctorRequestRepository
        {
            get
            {
                if (_DoctorRequestRepository == null)
                    _DoctorRequestRepository = new GenericRepository<Request>(context);
                return _DoctorRequestRepository;
            }
        }

        public IRepository<ApplicationUser> ApplicationUserRepository
        {
            get
            {
                if (_ApplicationUserRepository == null)
                    _ApplicationUserRepository = new GenericRepository<ApplicationUser>(context);
                return _ApplicationUserRepository;
            }
        }

        public IRepository<CenterAdmin> CenterAdminRepository
        {
            get
            {
                if (_CenterAdminRepository == null)
                    _CenterAdminRepository = new GenericRepository<CenterAdmin>(context);
                return _CenterAdminRepository;
            }
        }

        public IRepository<Center> CenterRepository
        {
            get
            {
                if (_CenterRepository == null)
                    _CenterRepository = new GenericRepository<Center>(context);
                return _CenterRepository;
            }
        }

        public IRepository<Hospital> HospitalRepository
        {
            get
            {
                if (_HospitalRepository == null)
                    _HospitalRepository = new GenericRepository<Hospital>(context);
                return _HospitalRepository;
            }
        }

        public IRepository<DonorRegistrationForDonation> DonorRegistrationForDonationRepository
        {
            get
            {
                if(_DonorRegistrationForDonationRepository == null) 
                {
                    _DonorRegistrationForDonationRepository = new GenericRepository<DonorRegistrationForDonation>(context);
                }
                return _DonorRegistrationForDonationRepository;
            }
        }

        private bool disposed = false;
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
