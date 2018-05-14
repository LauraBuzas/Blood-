using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DatabaseAccess.Data;
using DatabaseAccess.Models;
using BloodPlus.Services2;
using Services;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace BloodPlus
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(DatabaseAccess.Configuration.ConnectionString));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = false;
            });
            

            //services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            //        .AddCookie(options =>
            //        {
            //            options.LoginPath = "/";
            //            options.CookieHttpOnly = false;
                        


            //        });

            //services.AddAuthentication(options =>
            //      {
            //          options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
            //          options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;


            //      });

            //services.AddSession(options =>
            //{
            //    options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Lax;
            //});

            services.AddTransient<ApplicationDbContext>();

            // Add application services.
            services.AddTransient<IEmailSender, EmailSender>();
			
            services.AddMvc();
            services.AddTransient<DoctorsService>();
            services.AddTransient<AdminService>();
            services.AddTransient<EmployeeService>();
            services.AddTransient<DonorService>();
            services.AddTransient<EmployeeProfileService>();
            services.AddTransient<DoctorProfileService>();
            services.AddTransient<PatientService>();
            services.AddTransient<DonorProfileService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }
            //else
            //{
            //app.UseExceptionHandler();
            //}

            //app.UseStaticFiles();

            app.UseAuthentication();
            
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            app.UseMvc();

            //app.UseCookieAuthentication(new CookieAuthenticationOptions { CookieHttpOnly = false });



        }
    }
}
