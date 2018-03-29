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
