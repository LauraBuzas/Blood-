using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class AddTableDonorRegistrationForDonationComplete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DonorsRegistrationsForDonation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Age = table.Column<int>(nullable: false),
                    BeatsPerMiute = table.Column<int>(nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    BloodPressure = table.Column<int>(nullable: false),
                    Brucellosis = table.Column<bool>(nullable: false),
                    CNP = table.Column<int>(nullable: false),
                    Cancer = table.Column<bool>(nullable: false),
                    CityOfBirth = table.Column<string>(nullable: true),
                    CountyOfBirth = table.Column<string>(nullable: true),
                    CurrentCity = table.Column<string>(nullable: true),
                    CurrentCounty = table.Column<string>(nullable: true),
                    Diabetes = table.Column<bool>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    EndocrineDisease = table.Column<bool>(nullable: false),
                    Epilepsy = table.Column<bool>(nullable: false),
                    HadSurgery = table.Column<int>(nullable: false),
                    HeartDisease = table.Column<bool>(nullable: false),
                    HeartDiseases = table.Column<bool>(nullable: false),
                    Hepatitis = table.Column<bool>(nullable: false),
                    Hypertension = table.Column<bool>(nullable: false),
                    KidneyDisease = table.Column<bool>(nullable: false),
                    LiverDisease = table.Column<bool>(nullable: false),
                    Malaria = table.Column<bool>(nullable: false),
                    MentalIlness = table.Column<bool>(nullable: false),
                    MindIlnesses = table.Column<bool>(nullable: false),
                    Myopia = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    OtherPersonName = table.Column<string>(nullable: true),
                    OtherPersonSurname = table.Column<string>(nullable: true),
                    Period = table.Column<bool>(nullable: false),
                    PersonSex = table.Column<int>(nullable: false),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Pox = table.Column<bool>(nullable: false),
                    PregnancyStatus = table.Column<int>(nullable: false),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    SkinDiseases = table.Column<bool>(nullable: false),
                    Surname = table.Column<string>(nullable: true),
                    Tuberculosis = table.Column<bool>(nullable: false),
                    Ulcer = table.Column<bool>(nullable: false),
                    Weigth = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonorsRegistrationsForDonation", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DonorsRegistrationsForDonation");
        }
    }
}
