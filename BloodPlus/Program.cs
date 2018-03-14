using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BloodPlus.Data;
using BloodPlus.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;


namespace BloodPlus
{
    public class Program
    {
        public static void Main(string[] args)
        {

            
            var host = BuildWebHost(args);
            using (var scope = host.Services.CreateScope())
            {
                //var services = scope.ServiceProvider;
                var services = scope.ServiceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
                
                    var context = services.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                    var userManager = services.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var roleManager = services.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                //services.ServiceProvider.GetService<ApplicationDbContext>().Initialize();
                //services.ServiceProvider.GetService<UserManager<ApplicationUser>>().Seed();
                DbInitializer.Initialize(context, userManager,roleManager);
                
            }
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
