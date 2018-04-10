﻿using DatabaseAccess.Data;
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

        public IRepository<HospitalAdmin> HospitalAdminRepository
        {
            get
            {
                if (_HospitalAdminRepository == null)
                    _HospitalAdminRepository = new GenericRepository<HospitalAdmin>(context);
                return _HospitalAdminRepository;
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
