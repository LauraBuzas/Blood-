using DatabaseAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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
            await SeedDoctors(context, userManager);
            await SeedCenterAdmin(context, userManager);
            await SeedCenters(context, userManager);
            await SeedEmployees(context, userManager);

        }


        public static async Task Seed(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {

            await userManager.CreateAsync(new ApplicationUser { Email = "god@iss.com", UserName = "god@iss.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "hospitalAdmin@admin.com", UserName = "hospitalAdmin@admin.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "doctor1@spital.com", UserName = "doctor1@spital.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "centerAdmin@admin.com", UserName = "centerAdmin@admin.com" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "employee1@center.com", UserName = "Employee1" }, "Password123.");


            await roleManager.CreateAsync(new IdentityRole { Name = "God"});
            await roleManager.CreateAsync(new IdentityRole { Name = "DonationCenterAdmin"});
            await roleManager.CreateAsync(new IdentityRole { Name = "HospitalAdmin"});
            await roleManager.CreateAsync(new IdentityRole { Name = "DonationCenterDoctor"});
            await roleManager.CreateAsync(new IdentityRole { Name = "HospitalDoctor"});

            var createdUser =await userManager.FindByEmailAsync("god@iss.com");
            var createdDoctor = await userManager.FindByEmailAsync("doctor1@spital.com");
            var createdHospitalAdmin = await userManager.FindByEmailAsync("hospitalAdmin@admin.com");
            var createdCenterAdmin = await userManager.FindByEmailAsync("centerAdmin@admin.com");
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
            await userManager.AddToRolesAsync(createdUser, new List<string> { role1.Name, role2.Name, role3.Name, role4.Name, role5.Name, role6.Name });
            await userManager.AddToRoleAsync(createdDoctor, role5.Name);
            await userManager.AddToRoleAsync(createdHospitalAdmin, role3.Name);
            await userManager.AddToRoleAsync(createdCenterAdmin, role2.Name);
            await userManager.AddToRoleAsync(createdEmployee, role4.Name);

        }
        
        private static async Task SeedHospitals(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Hospital hospital1 = new Hospital()
            {
                Name="Hospital1",
            };

            var createdHospitalAdmin = await userManager.FindByEmailAsync("hospitalAdmin@admin.com");
            hospital1.HospitalAdminId = createdHospitalAdmin.Id;
            context.Hospitals.Add(hospital1);
            context.SaveChanges();
        }
        private static async Task SeedCenterAdmin(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            CenterAdmin centerAdmin = new CenterAdmin();
            var createdCenterAdmin = await userManager.FindByEmailAsync("centerAdmin@admin.com");
            centerAdmin.Id = createdCenterAdmin.Id;
            context.CenterAdmins.Add(centerAdmin);
            context.SaveChanges();
        }

        private static async Task SeedCenters(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Center center1 = new Center()
            {
                CenterName = "Center1"
            };

            var createdCenterAdmin = await userManager.FindByEmailAsync("centerAdmin@admin.com");
            center1.CenterAdminId = createdCenterAdmin.Id;
            context.Centers.Add(center1);
            context.SaveChanges();
        }

        private static async Task SeedHospitalAdmin(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            HospitalAdmin hospitalAdmin = new HospitalAdmin();
            var createdHospitalAdmin = await userManager.FindByEmailAsync("hospitalAdmin@admin.com");
            hospitalAdmin.Id = createdHospitalAdmin.Id;
            context.HospitalAdmins.Add(hospitalAdmin);
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
        
            context.Employee.Add(employee);
            context.SaveChanges();
        }

        private static async Task SeedDoctors(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Doctor doctor1 = new Doctor()
            {
                FirstName = "Vasile",
                LastName = "Ionescu",
                Speciality = "Surgery",
                Ward = "Ward 1",
                HospitalId=1
            };

            var createdUser = await userManager.FindByEmailAsync("doctor1@spital.com");
            doctor1.Id = createdUser.Id;

            //Doctor doctor2 = new Doctor()
            //{
            //    FirstName = "Daniel",
            //    LastName = "Popa",
            //    Speciality = "Dermatologist",
            //    Ward = "Ward 2"
            //};
            //Doctor doctor3 = new Doctor()
            //{
            //    FirstName = "Ionel",
            //    LastName = "Popescu",
            //    Speciality = "Cardiologist",
            //    Ward = "Ward 3"
            //};

            context.Doctors.Add(doctor1);
            //context.Doctors.Add(doctor2);
            //context.Doctors.Add(doctor3);
            context.SaveChanges();

        }
    }
}
