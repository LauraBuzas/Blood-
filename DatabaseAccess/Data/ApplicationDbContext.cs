using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DatabaseAccess.Models;

namespace DatabaseAccess.Data
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

        public DbSet<HospitalAdmin> HospitalAdmins { get; set; }

        //public DbSet<Patient> Patients { get; set; }


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
            builder.Entity<HospitalAdmin>().ToTable("HospitalAdmins");

            builder.Entity<Doctor>(doc => doc.HasOne<ApplicationUser>()
                                             .WithOne()
                                             .HasForeignKey<Doctor>(d => d.Id));

            builder.Entity<HospitalAdmin>(ha=>ha.HasOne<ApplicationUser>()
                                              .WithOne()
                                              .HasForeignKey<HospitalAdmin>(h => h.Id));
            //One to one Hospital-HospitalAdmin
            builder.Entity<HospitalAdmin>()
               .HasOne(ha => ha.Hospital)
               .WithOne(h => h.HospitalAdmin)
               .HasForeignKey<Hospital>(h => h.HospitalAdminId)
               .OnDelete(DeleteBehavior.Restrict);

            //One to many Hospital-Doctor
            builder.Entity<Hospital>()
                .HasMany(h => h.Doctors)
                .WithOne(d => d.Hospital)
                .HasForeignKey(d => d.HospitalId);

        }
    }
}
