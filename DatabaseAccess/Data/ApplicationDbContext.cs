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

        public DbSet<CenterAdmin> CenterAdmins { get; set; }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Request> Requests { get; set; }

        public DbSet<BloodBag> BloodBags { get; set; }

        public DbSet<MedicalAnalysis> MedicalAnalyses { get; set; }



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
            builder.Entity<Patient>().ToTable("Patients");
            builder.Entity<Request>().ToTable("Requests");
            builder.Entity<CenterAdmin>().ToTable("CenterAdmins");
            builder.Entity<BloodBag>().ToTable("BloodBags");
            builder.Entity<MedicalAnalysis>().ToTable("MedicalAnalyses");

            //One to one Doctor-ApplicationUser
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

            //One to one Employee-ApplicationUser
            //builder.Entity<Employee>(em => em.HasOne<ApplicationUser>()
            //                                 .WithOne()
            //                                 .HasForeignKey<Employee>(e => e.Id));

            //builder.Entity<CenterAdmin>(ca => ca.HasOne<ApplicationUser>()
            //                                .WithOne()
            //                                .HasForeignKey<CenterAdmin>(c => c.Id));

            //one to one center-centerAdmin
            //builder.Entity<CenterAdmin>()
            //   .HasOne(ca => ca.Center)
            //   .WithOne(c => c.CenterAdmin)
            //   .HasForeignKey<Center>(c => c.CenterAdminId)
            //   .OnDelete(DeleteBehavior.Restrict);

            //One to many Hospital-Doctor
            builder.Entity<Hospital>()
                .HasMany(h => h.Doctors)
                .WithOne(d => d.Hospital)
                .HasForeignKey(d => d.HospitalId);

            //One to many Center-Employee
            builder.Entity<Center>()
                .HasMany(c => c.Employees)
                .WithOne(e => e.Center)
                .HasForeignKey(c => c.CenterId);

            //One to one Donor-Address
            builder.Entity<Donor>()
                .HasOne(d => d.Address)
                .WithOne()
                .HasForeignKey<Donor>(d => d.AddressId);

            //One to many Donor-Analyses
            builder.Entity<Donor>()
                .HasMany(d => d.MedicalAnalysis)
                .WithOne(ma => ma.Donor)
                .HasForeignKey(ma => ma.DonorId);

            //One to one Donor-ApplicationUser
            builder.Entity<Donor>(doc => doc.HasOne<ApplicationUser>()
                                             .WithOne()
                                             .HasForeignKey<Donor>(d => d.Id));

            //One to one Employee-ApplicationUser
            builder.Entity<Employee>(emp => emp.HasOne<ApplicationUser>()
                                            .WithOne()
                                            .HasForeignKey<Employee>(e => e.Id));


            builder.Entity<CenterAdmin>(ca => ca.HasOne<ApplicationUser>()
                                  .WithOne()
                                  .HasForeignKey<CenterAdmin>(c => c.Id));

            //One to many Doctor-Patients
            builder.Entity<Doctor>()
                .HasMany(d => d.Patients)
                .WithOne(p => p.Doctor)
                .HasForeignKey(p => p.IdDoctor);

            //One to many Doctor-Requests
            builder.Entity<Doctor>()
                .HasMany(d => d.Requests)
                .WithOne(r => r.Doctor)
                .HasForeignKey(r => r.IdDoctor);

            //One to one Request-Patient
            builder.Entity<Request>()
                .HasOne(r => r.Patient)
                .WithOne(p => p.Request)
                .HasForeignKey<Request>(r => r.IdPatient);

            //One to one Analysis-BloodBag
            builder.Entity<MedicalAnalysis>()
                .HasOne(ma => ma.BloodBag)
                .WithOne(b => b.Analysis)
                .HasForeignKey<MedicalAnalysis>(ma => ma.BloodBagId);

            //One to many Center-BloodBag
            builder.Entity<Center>()
                .HasMany(c => c.BloodBags)
                .WithOne(b => b.Center)
                .HasForeignKey(b => b.CenterId);


        }
    }
}
