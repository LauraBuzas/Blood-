using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BloodPlus.Models;

namespace BloodPlus.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Address> Addresses { get; set; }

        public DbSet<Hospital> Hospitals { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Donor> Donors { get; set; }

        public DbSet<Center> Centers { get; set; }

        public DbSet<Employee> Employee { get; set; }

        public DbSet<Patient> Patient { get; set; }

        public DbSet<Request> Request { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.Entity<Address>().ToTable("Addresses");
            builder.Entity<Hospital>().ToTable("Hospitals");
            builder.Entity<Doctor>().ToTable("Doctors");
            builder.Entity<Donor>().ToTable("Donors");
            builder.Entity<Center>().ToTable("Centers");
            builder.Entity<Employee>().ToTable("Employees");
            builder.Entity<Patient>().ToTable("Patients");
            builder.Entity<Request>().ToTable("Requests");

        }
    }
}
