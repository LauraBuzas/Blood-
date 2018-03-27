using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseAccess.UOW
{
    public interface IUnitOfWork
    {
        void Save();
    }
}
