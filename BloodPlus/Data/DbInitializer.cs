using BloodPlus.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodPlus.Data
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
        }


        public static async Task Seed(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            List<ApplicationUser> identityUsers = new List<ApplicationUser>()
            {
                new ApplicationUser{Email="god@iss.com",UserName="god"}
            };

            await userManager.CreateAsync(new ApplicationUser { Email = "god@iss.com", UserName = "God" }, "Password123.");

            await roleManager.CreateAsync(new IdentityRole { Name = "God"});
            await roleManager.CreateAsync(new IdentityRole { Name = "DonationCenterAdmin"});
            await roleManager.CreateAsync(new IdentityRole { Name = "HospitalAdmin"});
            await roleManager.CreateAsync(new IdentityRole { Name = "DonationCenterDoctor"});
            await roleManager.CreateAsync(new IdentityRole { Name = "HospitalDoctor"});
            await roleManager.CreateAsync(new IdentityRole { Name = "Donator"});

            var createdUser =await userManager.FindByEmailAsync("god@iss.com");

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

        }

       


    }
}
