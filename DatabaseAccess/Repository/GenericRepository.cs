using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseAccess.Repository
{
    public class GenericRepository<TEntity>:IRepository<TEntity> where TEntity:class
    {
       
        public DbSet<TEntity> dbset;
        public DbContext context;

        public GenericRepository(DbContext context)
        {
            this.context = context;
            dbset = context.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            dbset.Add(entity);
        }

        public void Delete(int id)
        {
            TEntity entity = GetById(id);
            dbset.Remove(entity);
        }

        public void Delete(TEntity entity)
        {
            dbset.Remove(entity);
        }

        public IQueryable<TEntity> GetAll()
        {
            return dbset;
        }

        public TEntity GetById(int id)
        {
            return dbset.Find(id);
        }

        public TEntity GetByFunc(Func<TEntity, bool> func)
        {
            return dbset.AsQueryable().Where(x => func(x)).FirstOrDefault();
        }

        public void Update(TEntity entity)
        {
            dbset.Update(entity);
        }
    }
}
