using DatabaseAccess.Data;
using DatabaseAccess.Models;
using DatabaseAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        private IRepository<MedicalAnalysis> _MedicalAnalysisRepository;
        private IRepository<Center> _CenterRepository;
        private IRepository<Hospital> _HospitalRepository;

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
