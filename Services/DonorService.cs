using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public class DonorService
    {
        //public List<Donor> GetDoctors(int HospitlId)
        //{
        //    using (UnitOfWork uow = new UnitOfWork())
        //    {
        //        return uow.DonorRepository.GetAll().Where(d => d.HospitalId == HospitlId).ToList();
        //    }
        //}

        public Donor AddDonor(Donor donor)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.DonorRepository.Add(donor);
                uow.Save();
                return donor;
            }
        }

    }
}
