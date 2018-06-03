using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.ModelViews
{
    public class DonorAnalysisModelView
    {
        public int CNP { get; set; }

        public String Name { get; set; }

        public String Surname { get; set; }

        public String BirthDate { get; set; }

        public String CityOfBirth { get; set; }

        public String CountyOfBirth { get; set; }

        public String CurrentCity { get; set; }

        public String CurrentCounty { get; set; }

        public int Age { get; set; }

        public int Weigth { get; set; }

        public int BeatsPerMiute { get; set; }

        public int BloodPressure { get; set; }

        public String HadSurgery { get; set; }

        public String PersonSex { get; set; }

        public String PregnancyStatus { get; set; }

        public bool Period { get; set; }

        //treatment for:
        public bool HeartDisease { get; set; }

        public bool Hypertension { get; set; }

        public bool KidneyDisease { get; set; }

        public bool MentalIlness { get; set; }

        public bool LiverDisease { get; set; }

        public bool EndocrineDisease { get; set; }

        //diseases:
        public bool Hepatitis { get; set; }

        public bool Tuberculosis { get; set; }

        public bool Pox { get; set; } //sifilis

        public bool Malaria { get; set; }

        public bool Epilepsy { get; set; }

        public bool MindIlnesses { get; set; }

        public bool Brucellosis { get; set; }

        public bool Ulcer { get; set; }

        public bool Diabetes { get; set; }

        public bool HeartDiseases { get; set; }

        public bool SkinDiseases { get; set; }

        public bool Myopia { get; set; }

        public bool Cancer { get; set; }

        //personal data
        public String Email { get; set; }

        public String PhoneNumber { get; set; }

        public String OtherPersonName { get; set; }

        public String OtherPersonSurname { get; set; }

        public String RegistrationDate { get; set; }
    }
}
