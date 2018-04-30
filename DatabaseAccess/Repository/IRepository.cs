using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseAccess.Repository
{
    public interface IRepository<TEntity> where TEntity : class
    {
            IQueryable<TEntity> GetAll();

            TEntity GetById(int id);

            TEntity GetById(string id); //pusa de mine AC

            TEntity GetByFunc(Func<TEntity, bool> func);

            void Add(TEntity entity);

            void Delete(int id);

            void Delete(TEntity entity);

            void Update(TEntity entity);
    }
}
