﻿using BloodPlus.ModelViews;
using DatabaseAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Mappers
{
    public static class MapperMedicalAnalysis
    {
        public static MedicalAnalysis ToMedicalAnalysis(MedicalAnalysisViewModel analysisViewModel)
        {
            return new MedicalAnalysis
            {
                ALTLevel = analysisViewModel.ALTLevel,
                HepatitisB = analysisViewModel.HepatitisB,
                HepatitisC = analysisViewModel.HepatitisC,
                HIV = analysisViewModel.HIV,
                HTLV = analysisViewModel.HTLV,
                Sifilis = analysisViewModel.Sifilis,
                DateAndTime = analysisViewModel.DateAndTime
            };
        }

        public static MedicalAnalysisViewModel ToMedicalAnalysisViewModel(MedicalAnalysis analysis)
        {
            return new MedicalAnalysisViewModel
            {
                ALTLevel = analysis.ALTLevel,
                HepatitisB = analysis.HepatitisB,
                HepatitisC = analysis.HepatitisC,
                HIV = analysis.HIV,
                HTLV = analysis.HTLV,
                Sifilis = analysis.Sifilis,
                DateAndTime =  analysis.DateAndTime
            };
        }
    }
}
