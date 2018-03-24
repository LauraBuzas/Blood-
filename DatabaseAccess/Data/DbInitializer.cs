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

            await SeedDoctors(context,userManager);
        }

        private static async Task SeedDoctors(ApplicationDbContext context, UserManager<ApplicationUser>userManager)
        {
            Doctor doctor1 = new Doctor()
            {
                FirstName = "Vasile",
                LastName = "Ionescu",
                Speciality = "Surgery",
                Ward = "Ward 1"
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

        public static async Task Seed(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {

            await userManager.CreateAsync(new ApplicationUser { Email = "god@iss.com", UserName = "God" }, "Password123.");
            await userManager.CreateAsync(new ApplicationUser { Email = "doctor1@spital.com", UserName = "johnica"}, "Password123.");

            await roleManager.CreateAsync(new IdentityRole { Name = "God"});
            await roleManager.CreateAsync(new IdentityRole { Name = "DonationCenterAdmin"});
            await roleManager.CreateAsync(new IdentityRole { Name = "HospitalAdmin"});
            await roleManager.CreateAsync(new IdentityRole { Name = "DonationCenterDoctor"});
            await roleManager.CreateAsync(new IdentityRole { Name = "HospitalDoctor"});
            await roleManager.CreateAsync(new IdentityRole { Name = "Donator"});

            var createdUser =await userManager.FindByEmailAsync("god@iss.com");
            var createdDoctor = await userManager.FindByEmailAsync("doctor1@spital.com");


            var role1 = await roleManager.FindByNameAsync("God");
            var role2 = await roleManager.FindByNameAsync("DonationCenterAdmin");
            //await userManager.AddToRoleAsync(createdUser, role2.Name);
            var role3 = await roleManager.FindByNameAsync("HospitalAdmin");
            //await userManager.AddToRoleAsync(createdUser, role3.Name);
            var role4 = await roleManager.FindByNameAsync("DonationCenterDoctor");
            //await userManager.AddToRoleAsync(createdUser, role4.Name);
            var role5 = await roleManager.FindByNameAsync("HospitalDoctor");
            //await userManager.AddToRoleAsync(createdUser, role5.Name); 
            var role6 = await roleManager.FindByNameAsync("Donator");
            //await userManager.AddToRoleAsync(createdUser, role6.Name);
            await userManager.AddToRolesAsync(createdUser, new List<string> { role1.Name, role2.Name, role3.Name, role4.Name, role5.Name, role6.Name });
            await userManager.AddToRoleAsync(createdDoctor, role5.Name);
        }

       


    }
}
