﻿// <auto-generated />
using DatabaseAccess.Data;
using DatabaseAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace DatabaseAccess.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20180504141436_PatientAddressMigration")]
    partial class PatientAddressMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DatabaseAccess.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ApartmentNumber");

                    b.Property<string>("City")
                        .IsRequired();

                    b.Property<string>("County")
                        .IsRequired();

                    b.Property<int>("Floor");

                    b.Property<int>("Number");

                    b.Property<string>("Street")
                        .IsRequired();

                    b.Property<string>("Unit");

                    b.HasKey("Id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("DatabaseAccess.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("DatabaseAccess.Models.BloodBag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CenterId");

                    b.Property<int>("Stage");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("CenterId");

                    b.ToTable("BloodBags");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Center", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("AvailableQuantity");

                    b.Property<string>("CenterAdminId");

                    b.Property<string>("CenterName");

                    b.Property<int>("IdAddress");

                    b.HasKey("Id");

                    b.HasIndex("CenterAdminId")
                        .IsUnique()
                        .HasFilter("[CenterAdminId] IS NOT NULL");

                    b.HasIndex("IdAddress")
                        .IsUnique();

                    b.ToTable("Centers");
                });

            modelBuilder.Entity("DatabaseAccess.Models.CenterAdmin", b =>
                {
                    b.Property<string>("Id");

                    b.HasKey("Id");

                    b.ToTable("CenterAdmins");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Doctor", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<int>("HospitalId");

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<string>("Speciality")
                        .IsRequired();

                    b.Property<string>("Ward")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("HospitalId");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Donor", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AddressId");

                    b.Property<string>("CNP")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("AddressId")
                        .IsUnique();

                    b.ToTable("Donors");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Employee", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("Age");

                    b.Property<int>("CenterId");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.HasKey("Id");

                    b.HasIndex("CenterId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Hospital", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("HospitalAdminId");

                    b.Property<int>("IdAddress");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("HospitalAdminId")
                        .IsUnique()
                        .HasFilter("[HospitalAdminId] IS NOT NULL");

                    b.HasIndex("IdAddress")
                        .IsUnique();

                    b.ToTable("Hospitals");
                });

            modelBuilder.Entity("DatabaseAccess.Models.HospitalAdmin", b =>
                {
                    b.Property<string>("Id");

                    b.HasKey("Id");

                    b.ToTable("HospitalAdmins");
                });

            modelBuilder.Entity("DatabaseAccess.Models.MedicalAnalysis", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("ALTLevel");

                    b.Property<int>("BloodBagId");

                    b.Property<DateTime>("DateAndTime");

                    b.Property<string>("DonorId");

                    b.Property<bool>("HIV");

                    b.Property<bool>("HTLV");

                    b.Property<bool>("HepatitisB");

                    b.Property<bool>("HepatitisC");

                    b.Property<string>("Observations");

                    b.Property<bool>("RejectedOtherCauses");

                    b.Property<bool>("Sifilis");

                    b.HasKey("Id");

                    b.HasIndex("BloodBagId")
                        .IsUnique();

                    b.HasIndex("DonorId");

                    b.ToTable("MedicalAnalyses");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CNP")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<int>("IdAddress");

                    b.Property<string>("IdDoctor");

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("IdAddress")
                        .IsUnique();

                    b.HasIndex("IdDoctor");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Plasma", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BloodType");

                    b.Property<DateTime>("ExpirationDateAndTime");

                    b.Property<DateTime>("SeparationDateAndTime");

                    b.HasKey("Id");

                    b.ToTable("Plasmas");
                });

            modelBuilder.Entity("DatabaseAccess.Models.RedBloodCell", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BloodType");

                    b.Property<DateTime>("ExpirationDateAndTime");

                    b.Property<int>("RhType");

                    b.Property<DateTime>("SeparationDateAndTime");

                    b.HasKey("Id");

                    b.ToTable("RedBloodCells");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BloodType");

                    b.Property<int>("Component");

                    b.Property<DateTime>("DateOfRequest");

                    b.Property<int>("EmergencyLevel");

                    b.Property<int>("IdPatient");

                    b.Property<int>("ReceivedQuantity");

                    b.Property<int>("RequestedQuantity");

                    b.Property<int>("Rh");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("IdPatient");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Thrombocyte", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BloodType");

                    b.Property<DateTime>("ExpirationDateAndTime");

                    b.Property<int>("RhType");

                    b.Property<DateTime>("SeparationDateAndTime");

                    b.HasKey("Id");

                    b.ToTable("Thrombocytes");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("DatabaseAccess.Models.BloodBag", b =>
                {
                    b.HasOne("DatabaseAccess.Models.Center", "Center")
                        .WithMany("BloodBags")
                        .HasForeignKey("CenterId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatabaseAccess.Models.Center", b =>
                {
                    b.HasOne("DatabaseAccess.Models.CenterAdmin", "CenterAdmin")
                        .WithOne("Center")
                        .HasForeignKey("DatabaseAccess.Models.Center", "CenterAdminId");

                    b.HasOne("DatabaseAccess.Models.Address", "Address")
                        .WithOne()
                        .HasForeignKey("DatabaseAccess.Models.Center", "IdAddress")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatabaseAccess.Models.CenterAdmin", b =>
                {
                    b.HasOne("DatabaseAccess.Models.ApplicationUser")
                        .WithOne()
                        .HasForeignKey("DatabaseAccess.Models.CenterAdmin", "Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatabaseAccess.Models.Doctor", b =>
                {
                    b.HasOne("DatabaseAccess.Models.Hospital", "Hospital")
                        .WithMany("Doctors")
                        .HasForeignKey("HospitalId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DatabaseAccess.Models.ApplicationUser")
                        .WithOne()
                        .HasForeignKey("DatabaseAccess.Models.Doctor", "Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatabaseAccess.Models.Donor", b =>
                {
                    b.HasOne("DatabaseAccess.Models.Address", "Address")
                        .WithOne()
                        .HasForeignKey("DatabaseAccess.Models.Donor", "AddressId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DatabaseAccess.Models.ApplicationUser")
                        .WithOne()
                        .HasForeignKey("DatabaseAccess.Models.Donor", "Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatabaseAccess.Models.Employee", b =>
                {
                    b.HasOne("DatabaseAccess.Models.Center", "Center")
                        .WithMany("Employees")
                        .HasForeignKey("CenterId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DatabaseAccess.Models.ApplicationUser")
                        .WithOne()
                        .HasForeignKey("DatabaseAccess.Models.Employee", "Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatabaseAccess.Models.Hospital", b =>
                {
                    b.HasOne("DatabaseAccess.Models.HospitalAdmin", "HospitalAdmin")
                        .WithOne("Hospital")
                        .HasForeignKey("DatabaseAccess.Models.Hospital", "HospitalAdminId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("DatabaseAccess.Models.Address", "Address")
                        .WithOne()
                        .HasForeignKey("DatabaseAccess.Models.Hospital", "IdAddress")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatabaseAccess.Models.HospitalAdmin", b =>
                {
                    b.HasOne("DatabaseAccess.Models.ApplicationUser")
                        .WithOne()
                        .HasForeignKey("DatabaseAccess.Models.HospitalAdmin", "Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatabaseAccess.Models.MedicalAnalysis", b =>
                {
                    b.HasOne("DatabaseAccess.Models.BloodBag", "BloodBag")
                        .WithOne("Analysis")
                        .HasForeignKey("DatabaseAccess.Models.MedicalAnalysis", "BloodBagId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DatabaseAccess.Models.Donor", "Donor")
                        .WithMany("MedicalAnalysis")
                        .HasForeignKey("DonorId");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Patient", b =>
                {
                    b.HasOne("DatabaseAccess.Models.Address", "Address")
                        .WithOne()
                        .HasForeignKey("DatabaseAccess.Models.Patient", "IdAddress")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DatabaseAccess.Models.Doctor", "Doctor")
                        .WithMany("Patients")
                        .HasForeignKey("IdDoctor");
                });

            modelBuilder.Entity("DatabaseAccess.Models.Request", b =>
                {
                    b.HasOne("DatabaseAccess.Models.Patient", "Patient")
                        .WithMany("Requests")
                        .HasForeignKey("IdPatient")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("DatabaseAccess.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("DatabaseAccess.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DatabaseAccess.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("DatabaseAccess.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
