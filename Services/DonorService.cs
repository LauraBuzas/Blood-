using DatabaseAccess.Models;
using DatabaseAccess.UOW;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services
{
    public class DonorService
    {

        public Donor AddDonor(Donor donor, Address address)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                uow.AddressRepository.Add(address);
                uow.Save();

                donor.AddressId = address.Id;
                uow.DonorRepository.Add(donor);
                uow.Save();
                return donor;
            }
        }

        public List<MedicalAnalysis> GetMedicalAnalyses(string id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.DonorRepository.GetAll().Include(d => d.MedicalAnalysis).Where(d => d.Id == id).FirstOrDefault().MedicalAnalysis;
            }
        }

        public object GetCenterIdForCenterDoctor(string id)
        {
            throw new NotImplementedException();
        }
    }
}
