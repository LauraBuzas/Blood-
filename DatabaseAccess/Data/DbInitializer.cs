using DatabaseAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseAccess.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            context.Database.Migrate();

            if (context.Roles.Any())
            {
                return;
            }

            await Seed(userManager, roleManager);
            await SeedHospitalAdmin(context, userManager);
            await SeedHospitals(context, userManager);
            await SeedDoctorsWithPatients(context, userManager);
            await SeedRequests(context);
            await SeedCenterAdmin(context, userManager);
            await SeedCenters(context, userManager);
            await SeedEmployees(context, userManager);
            await SeedDonor(context, userManager);
            await SeedBloodStockForCenters(context, userManager);

        }


        public static async Task Seed(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {

            await userManager.CreateAsync(new ApplicationUser { Email = "god@iss.com", UserName = "god@iss.com" }, "Password123.");

            await userManager.CreateAsync(new ApplicationUser { Email = "hospitalAdmin1@admin.com", UserName = "hospitalAdmin1@admin.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "hospitalAdmin2@admin.com", UserName = "hospitalAdmin2@admin.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "hospitalAdmin3@admin.com", UserName = "hospitalAdmin3@admin.com" }, "Password123.");

            await userManager.CreateAsync(new ApplicationUser { Email = "doctor1@spital.com", UserName = "doctor1@spital.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "doctor2@spital.com", UserName = "doctor2@spital.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "doctor3@spital.com", UserName = "doctor3@spital.com" }, "Password123.");

            await userManager.CreateAsync(new ApplicationUser { Email = "centerAdmin@admin.com", UserName = "centerAdmin@admin.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "centerAdmin2@admin.com", UserName = "centerAdmin2@admin.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "employee1@center.com", UserName = "employee1@center.com" }, "Password123.");

            await userManager.CreateAsync(new ApplicationUser { Email = "donor1@donor.com", UserName = "donor1@donor.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "donor2@donor.com", UserName = "donor2@donor.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "laura_andrada96@yahoo.com", UserName = "laura_andrada96@yahoo.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "alex.cornea19@gmail.com", UserName = "alex.cornea19@gmail.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "bogdyg97@gmail.com", UserName = "bogdyg97@gmail.com" }, "Password123.");


            await roleManager.CreateAsync(new IdentityRole { Name = "God"});
            await roleManager.CreateAsync(new IdentityRole { Name = "DonationCenterAdmin"});
            await roleManager.CreateAsync(new IdentityRole { Name = "HospitalAdmin"});
            await roleManager.CreateAsync(new IdentityRole { Name = "DonationCenterDoctor"});
            await roleManager.CreateAsync(new IdentityRole { Name = "HospitalDoctor"});
            await roleManager.CreateAsync(new IdentityRole { Name = "Donor" });

            var createdDonor = await userManager.FindByEmailAsync("donor1@donor.com");
            var createdDonor2 = await userManager.FindByEmailAsync("donor2@donor.com");
            var donorLaura = await userManager.FindByEmailAsync("laura_andrada96@yahoo.com");
            var donorAlex = await userManager.FindByEmailAsync("alex.cornea19@gmail.com");
            var donorBogdan = await userManager.FindByEmailAsync("bogdyg97@gmail.com");

            var createdUser =await userManager.FindByEmailAsync("god@iss.com");

            var createdDoctor1 = await userManager.FindByEmailAsync("doctor1@spital.com");
            var createdDoctor2 = await userManager.FindByEmailAsync("doctor2@spital.com");
            var createdDoctor3 = await userManager.FindByEmailAsync("doctor3@spital.com");

            var createdHospitalAdmin1 = await userManager.FindByEmailAsync("hospitalAdmin1@admin.com");
            var createdHospitalAdmin2 = await userManager.FindByEmailAsync("hospitalAdmin2@admin.com");
            var createdHospitalAdmin3 = await userManager.FindByEmailAsync("hospitalAdmin3@admin.com");

            var createdCenterAdmin = await userManager.FindByEmailAsync("centerAdmin@admin.com");
            var createdCenterAdmin2 = await userManager.FindByEmailAsync("centerAdmin2@admin.com");
            var createdEmployee = await userManager.FindByEmailAsync("employee1@center.com");

            var role1 = await roleManager.FindByNameAsync("God");
            var role2 = await roleManager.FindByNameAsync("DonationCenterAdmin");
            //await userManager.AddToRoleAsync(createdUser, role2.Name);
            var role3 = await roleManager.FindByNameAsync("HospitalAdmin");
            //await userManager.AddToRoleAsync(createdUser, role3.Name);
            var role4 = await roleManager.FindByNameAsync("DonationCenterDoctor");
            //await userManager.AddToRoleAsync(createdUser, role4.Name);
            var role5 = await roleManager.FindByNameAsync("HospitalDoctor");
            //await userManager.AddToRoleAsync(createdUser, role5.Name); 
            var role6 = await roleManager.FindByNameAsync("Donor");
            //await userManager.AddToRoleAsync(createdUser, role6.Name);
            //await userManager.AddToRolesAsync(createdUser, new List<string> { role1.Name, role2.Name, role3.Name, role4.Name, role5.Name, role6.Name });
            //TODO add analyses

            await userManager.AddToRoleAsync(createdDoctor1, role5.Name);
            await userManager.AddToRoleAsync(createdDoctor2, role5.Name);
            await userManager.AddToRoleAsync(createdDoctor3, role5.Name);

            await userManager.AddToRoleAsync(createdHospitalAdmin1, role3.Name);
            await userManager.AddToRoleAsync(createdHospitalAdmin2, role3.Name);
            await userManager.AddToRoleAsync(createdHospitalAdmin3, role3.Name);


            await userManager.AddToRoleAsync(createdCenterAdmin, role2.Name);
            await userManager.AddToRoleAsync(createdCenterAdmin2, role2.Name);
            await userManager.AddToRoleAsync(createdEmployee, role4.Name);

            await userManager.AddToRoleAsync(createdDonor, role6.Name);
            await userManager.AddToRoleAsync(createdDonor2, role6.Name);
            await userManager.AddToRoleAsync(donorLaura, role6.Name);
            await userManager.AddToRoleAsync(donorAlex, role6.Name);
            await userManager.AddToRoleAsync(donorBogdan, role6.Name);
        }
        
        private static async Task SeedHospitals(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Address addressHospital1 = new Address()
            {

                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Tabacarilor",
                Number = 11
            };
            Address addressHospital2 = new Address()
            {

                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Republicii",
                Number = 16
            };
            Address addressHospital3 = new Address()
            {

                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Clinicilor",
                Number = 3
            };
            context.Addresses.Add(addressHospital1);
            context.Addresses.Add(addressHospital2);
            context.Addresses.Add(addressHospital3);
            context.SaveChanges();

            Hospital hospital1 = new Hospital()
            {
                Name = "Spitalul Clinic Municipal",
                Address=addressHospital1               
            };

            var createdHospitalAdmin = await userManager.FindByEmailAsync("hospitalAdmin1@admin.com");
            hospital1.HospitalAdminId = createdHospitalAdmin.Id;
            context.Hospitals.Add(hospital1);
 
            Hospital hospital2 = new Hospital()
            {
                Name = "Spitalul Clinic Judetean de Urgenta",
                Address=addressHospital2,
            };

            var createdHospitalAdmin2 = await userManager.FindByEmailAsync("hospitalAdmin2@admin.com");
            hospital2.HospitalAdminId = createdHospitalAdmin2.Id;
            context.Hospitals.Add(hospital2);


            Hospital hospital3 = new Hospital()
            {
                Name = "Spitalul Universitar",
                Address = addressHospital3,
            };

            var createdHospitalAdmin3 = await userManager.FindByEmailAsync("hospitalAdmin3@admin.com");
            hospital3.HospitalAdminId = createdHospitalAdmin3.Id;
            context.Hospitals.Add(hospital3);
            context.SaveChanges();
        }

        private static async Task SeedCenterAdmin(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            CenterAdmin centerAdmin = new CenterAdmin();
            var createdCenterAdmin = await userManager.FindByEmailAsync("centerAdmin@admin.com");
            centerAdmin.Id = createdCenterAdmin.Id;
            context.CenterAdmins.Add(centerAdmin);
            context.SaveChanges();

            CenterAdmin centerAdmin2 = new CenterAdmin();
            var createdCenterAdmin2 = await userManager.FindByEmailAsync("centerAdmin2@admin.com");
            centerAdmin2.Id = createdCenterAdmin2.Id;
            context.CenterAdmins.Add(centerAdmin2);
            context.SaveChanges();
        }

        private static async Task SeedCenters(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Address addressCenter1 = new Address()
            {
                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Nicolae Balcescu",
                Number = 18
            };
            context.Addresses.Add(addressCenter1);
            context.SaveChanges();

            Center center1 = new Center()
            {
                CenterName = "Centru Donare Sânge Cluj-Napoca",
                Address=addressCenter1
            };

            var createdCenterAdmin = await userManager.FindByEmailAsync("centerAdmin@admin.com");
            center1.CenterAdminId = createdCenterAdmin.Id;
            context.Centers.Add(center1);
            context.SaveChanges();



            Address addressCenter2 = new Address()
            {

                City ="Bucuresti",
                County = "Ilfov",
                Street = "Doctor Constantin Caracaș",
                Number = 2
            };
            context.Addresses.Add(addressCenter2);
            context.SaveChanges();

            Center center2 = new Center()
            {
                CenterName = "Centrul de Transfuzie Sanguină ",
                Address = addressCenter2
            };

            var createdCenterAdmin2 = await userManager.FindByEmailAsync("centerAdmin2@admin.com");
            center2.CenterAdminId = createdCenterAdmin2.Id;
            context.Centers.Add(center2);
            context.SaveChanges();
        }

        private static async Task SeedHospitalAdmin(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            HospitalAdmin hospitalAdmin1 = new HospitalAdmin();
            var createdHospitalAdmin1 = await userManager.FindByEmailAsync("hospitalAdmin1@admin.com");
            hospitalAdmin1.Id = createdHospitalAdmin1.Id;
            context.HospitalAdmins.Add(hospitalAdmin1);

            HospitalAdmin hospitalAdmin2 = new HospitalAdmin();
            var createdHospitalAdmin2 = await userManager.FindByEmailAsync("hospitalAdmin2@admin.com");
            hospitalAdmin2.Id = createdHospitalAdmin2.Id;
            context.HospitalAdmins.Add(hospitalAdmin2);

            HospitalAdmin hospitalAdmin3 = new HospitalAdmin();
            var createdHospitalAdmin3 = await userManager.FindByEmailAsync("hospitalAdmin3@admin.com");
            hospitalAdmin3.Id = createdHospitalAdmin3.Id;
            context.HospitalAdmins.Add(hospitalAdmin3);

            context.SaveChanges();
        }

        private static async Task SeedEmployees(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Employee employee = new Employee()
            {
                FirstName = "Vasile",
                LastName = "Ionescu",
                CenterId = 1
               
            };

            var createdUser = await userManager.FindByEmailAsync("employee1@center.com");
            employee.Id = createdUser.Id;

            var center=context.Centers.Where(x => x.CenterName == "Centru Donare Sânge Cluj-Napoca").FirstOrDefault();
            employee.Center = center;
        
            context.Employee.Add(employee);
            context.SaveChanges();
        }
        private static async Task SeedDonor(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Address addressDonor1 = new Address()
            {

                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Constanta",
                Number = 20
            };

            Address addressDonor2 = new Address()
            {
                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Avram Iancu",
                Number = 25
            };

            Address addressLaura = new Address()
            {
                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Teodor-Mihali",
                Number = 31
            };

            Address addressAlex = new Address()
            {
                City = "Fagaras",
                County = "Brasov",
                Street = "Stirbei Voda",
                Number = 16
            };

            Address addressBogdan = new Address()
            {
                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Rapsondiei",
                Number = 28
            };

            context.Addresses.Add(addressDonor1);
            context.Addresses.Add(addressDonor2);
            context.Addresses.Add(addressLaura);
            context.Addresses.Add(addressAlex);
            context.Addresses.Add(addressBogdan);
            context.SaveChanges();

            Donor donor = new Donor()
            {
                CNP = "278010203412",
                FirstName = "Ileana",
                LastName = "Tudorescu",
                Address = addressDonor1
            };
            var createdUser = await userManager.FindByEmailAsync("donor1@donor.com");
            donor.Id = createdUser.Id;

            Donor donor2 = new Donor()
            {
                CNP = "1970329335674",
                FirstName = "Vasile",
                LastName = "Popescu",
                Address = addressDonor2
            };
            var createdUser2 = await userManager.FindByEmailAsync("donor2@donor.com");
            donor2.Id = createdUser2.Id;

            Donor donorLaura = new Donor()
            {
                CNP = "2970320132412",
                FirstName = "Laura",
                LastName = "Buzas",
                Address = addressLaura
            };
            var createdUserLaura = await userManager.FindByEmailAsync("laura_andrada96@yahoo.com");
            donorLaura.Id = createdUserLaura.Id;


            Donor donorAlex = new Donor()
            {
                CNP = "1970901123456",
                FirstName = "Alex",
                LastName = "Cornea",
                Address = addressAlex
            };

            var createdUserAlex = await userManager.FindByEmailAsync("alex.cornea19@gmail.com");
            donorAlex.Id = createdUserAlex.Id;

            Donor donorBogdan = new Donor()
            {
                CNP = "1970121123456",
                FirstName = "Bogdan",
                LastName = "Gheorghe",
                Address = addressBogdan
            };

            var createdUserBogdan = await userManager.FindByEmailAsync("bogdyg97@gmail.com");
            donorBogdan.Id = createdUserBogdan.Id;


            context.Donors.Add(donor);
            context.Donors.Add(donor2);
            context.Donors.Add(donorLaura);
            context.Donors.Add(donorAlex);
            context.Donors.Add(donorBogdan);
            context.SaveChanges();
        }

        private static async Task SeedDoctorsWithPatients(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Address addressPatient1 = new Address()
            {
                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Teodor Mihali",
                Number = 31,
                ApartmentNumber = 131,
                Floor = 1
            };
            Address addressPatient2 = new Address()
            {
                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Dorobantilor",
                Number = 10
            };
            Address addressPatient3 = new Address()
            {

                City = "Cluj-Napoca",
                County = "Cluj",
                Street = "Constanta",
                Number = 12
            };

            Address addressPatient4 = new Address()
            {

                City = "Constanta",
                County = "Constanta",
                Street = "Constanta",
                Number = 13
            };

            context.Addresses.Add(addressPatient1);
            context.Addresses.Add(addressPatient2);
            context.Addresses.Add(addressPatient3);
            context.Addresses.Add(addressPatient4);
            context.SaveChanges();

            Doctor doctor1 = new Doctor()
            {
                FirstName = "Vasile",
                LastName = "Ionescu",
                Speciality = "Chirurgie",
                Ward = "Sectia 1",
                HospitalId=1
            };
           
            var createdUser = await userManager.FindByEmailAsync("doctor1@spital.com");
            doctor1.Id = createdUser.Id;

            Patient patient1 = new Patient()
            {
               
                CNP = "1980506124567",
                LastName = "Popa",
                FirstName = "Ioana",
                Address = addressPatient1,
                Status=PatientStatus.INTERNAT,
                IdDoctor=doctor1.Id
            };
            Patient patient2 = new Patient()
            {
               
                CNP = "2980506126797",
                LastName = "Marinescu",
                FirstName = "Florina",
                Address = addressPatient2,
                Status = PatientStatus.INTERNAT,
                IdDoctor = doctor1.Id
            };
            Patient patient4 = new Patient()
            {

                CNP = "2690505123987",
                LastName = "Popescu",
                FirstName = "Luana",
                Address = addressPatient4,
                Status = PatientStatus.INTERNAT,
                IdDoctor = doctor1.Id
            };

            Doctor doctor2 = new Doctor()
            {
                FirstName = "Daniel",
                LastName = "Popa",
                Speciality = "Dermatolog",
                Ward = "Sectia 2",
                HospitalId=2
            };
            var createdUser2 = await userManager.FindByEmailAsync("doctor2@spital.com");
            doctor2.Id = createdUser2.Id;

            Patient patient3 = new Patient()
            {
               
                CNP = "2670506124567",
                LastName = "Gadea",
                FirstName = "Ana",
                Address = addressPatient3,
                Status = PatientStatus.EXTERNAT,
                IdDoctor = doctor2.Id
            };
            Doctor doctor3 = new Doctor()
            {
                FirstName = "Ioana",
                LastName = "Florea",
                Speciality = "Ginecolog",
                Ward = "Sectia 3",
                HospitalId=3
            };
            var createdUser3 = await userManager.FindByEmailAsync("doctor3@spital.com");
            doctor3.Id = createdUser3.Id;

            context.Doctors.Add(doctor1);
            context.SaveChanges();
            context.Patients.Add(patient1);
            context.Patients.Add(patient2);
            context.Patients.Add(patient4);
            context.SaveChanges();

            context.Doctors.Add(doctor2);   
            context.SaveChanges();

            context.Doctors.Add(doctor3);
            context.Patients.Add(patient3);
            context.SaveChanges();
        }

        private static async Task SeedBloodStockForCenters(ApplicationDbContext context,UserManager<ApplicationUser> userManager)
        {
            var center1 = context.Centers.Where(c => c.CenterName == "Centru Donare Sânge Cluj-Napoca").FirstOrDefault();
            var donor1 = context.Donors.Where(d => d.FirstName == "Laura").FirstOrDefault();
            var donor2 = context.Donors.Where(d => d.FirstName == "Bogdan").FirstOrDefault();
            BloodBag bloodbag1 = new BloodBag()
            {
                Center = center1,
                Date = DateTime.Now,
                Status = BloodBagStatus.Accepted,
                Stage = BloodBagStage.Qualification,
                BloodType = BloodTypes.B3,
                RhType = RhTypes.POZITIV,
                CenterId = center1.Id
            };
            context.BloodBags.Add(bloodbag1);
            context.SaveChanges();

            MedicalAnalysis medicalAnalysis1 = new MedicalAnalysis()
            {
                BloodBag = bloodbag1,
                DateAndTime = DateTime.Now,
                ALTLevel=false,
                Sifilis=false,
                HepatitisB=false,
                HepatitisC=false,
                HIV=false,
                HTLV=false,
                RejectedOtherCauses=false,
                Donor=donor1
            };

            context.MedicalAnalyses.Add(medicalAnalysis1);
            context.SaveChanges();

            BloodBag bloodbag2 = new BloodBag()
            {
                Center = center1,
                Date = DateTime.Now,
                Status = BloodBagStatus.Waiting,
                Stage = BloodBagStage.Sampling,
                BloodType = BloodTypes.B3,
                RhType = RhTypes.POZITIV,
                CenterId = center1.Id
            
            };
            context.BloodBags.Add(bloodbag2);
            context.SaveChanges();

            MedicalAnalysis medicalAnalysis2 = new MedicalAnalysis()
            {
                BloodBag = bloodbag2,
                DateAndTime = DateTime.Now,
                ALTLevel = false,
                Sifilis = false,
                HepatitisB = false,
                HepatitisC = false,
                HIV = false,
                HTLV = false,
                RejectedOtherCauses = false,
                Donor=donor1
            };

            context.MedicalAnalyses.Add(medicalAnalysis2);
            context.SaveChanges();

            BloodBag bloodbag3 = new BloodBag()
            {
                Center = center1,
                Date = DateTime.Now,
                Status = BloodBagStatus.Accepted,
                Stage = BloodBagStage.Qualification,
                BloodType = BloodTypes.O1,
                RhType = RhTypes.POZITIV,
                CenterId = center1.Id
            };
            context.BloodBags.Add(bloodbag3);
            context.SaveChanges();

            MedicalAnalysis medicalAnalysis3 = new MedicalAnalysis()
            {
                BloodBag = bloodbag3,
                DateAndTime = DateTime.Now,
                ALTLevel = false,
                Sifilis = false,
                HepatitisB = false,
                HepatitisC = false,
                HIV = false,
                HTLV = false,
                RejectedOtherCauses = false,
                Donor=donor2
            };

            context.MedicalAnalyses.Add(medicalAnalysis3);
            context.SaveChanges();

            BloodBag bloodbag4 = new BloodBag()
            {
                Center = center1,
                Date = DateTime.Now,
                Status = BloodBagStatus.Rejected,
                Stage = BloodBagStage.Sampling,
                BloodType = BloodTypes.B3,
                RhType = RhTypes.POZITIV,
                CenterId = center1.Id
            };
            context.BloodBags.Add(bloodbag4);
            context.SaveChanges();

            MedicalAnalysis medicalAnalysis4 = new MedicalAnalysis()
            {
                BloodBag = bloodbag4,
                DateAndTime = DateTime.Now,
                ALTLevel = false,
                Sifilis = false,
                HepatitisB = false,
                HepatitisC = false,
                HIV = false,
                HTLV = false,
                RejectedOtherCauses = true,
                Observations = "S-a găsit prea multă grăsime în sânge.",
                Donor = donor1
            };

            context.MedicalAnalyses.Add(medicalAnalysis4);
            context.SaveChanges();
        }

        private static async Task SeedRequests(ApplicationDbContext context)
        {
            Request request1 = new Request()
            {
                Component = ComponentType.BloodBag,
                RequestedQuantity = 3,
                DateOfRequest = DateTime.Now,
                EmergencyLevel = EmergencyLevel.RIDICAT,
                BloodType = BloodTypes.B3,
                IdPatient = 1,
                Rh = RhTypes.POZITIV
            };

            Request request2 = new Request()
            {
                Component = ComponentType.BloodBag,
                RequestedQuantity = 2,
                DateOfRequest = DateTime.Now,
                EmergencyLevel = EmergencyLevel.MEDIU,
                BloodType = BloodTypes.A2,
                IdPatient = 2,
                Rh = RhTypes.NEGATIV,
                ReceivedQuantity=2
            };

            Request request4 = new Request()
            {
                Component = ComponentType.BloodBag,
                RequestedQuantity = 3,
                DateOfRequest = DateTime.Now,
                EmergencyLevel = EmergencyLevel.RIDICAT,
                BloodType = BloodTypes.A2,
                IdPatient = 2,
                Rh = RhTypes.NEGATIV,
                ReceivedQuantity=1
                
            };

            Request request3 = new Request()
            {
                Component = ComponentType.RedBloodCells,
                RequestedQuantity = 2,
                DateOfRequest = DateTime.Now,
                EmergencyLevel = EmergencyLevel.SCĂZUT,
                BloodType = BloodTypes.O1,
                IdPatient = 3,
                Rh = RhTypes.POZITIV,
                ReceivedQuantity=1
            };

            context.Requests.Add(request1);
            context.Requests.Add(request2);
            context.Requests.Add(request3);
            context.Requests.Add(request4);
            context.SaveChanges();
        }
    }
}
