﻿using DatabaseAccess.UOW;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services
{
    public class AdminService
    {
        public int GetHospitalIdForHospitalAdmin(String HospitalAdminId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.HospitalAdminRepository.GetAll()
                    .Include(ha=>ha.Hospital)
                    .Where(ha => ha.Id == HospitalAdminId)       
                    .FirstOrDefault()
                    .Hospital
                    .Id;
            }
        }

        public int GetCenterIdForCenterAdmin(String CenterAdminId)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                return uow.CenterAdminRepository.GetAll()
                    .Include(ca => ca.Center)
                    .Where(ca => ca.Id == CenterAdminId)
                    .FirstOrDefault()
                    .Center
                    .Id;
            }
        }
    }
}
