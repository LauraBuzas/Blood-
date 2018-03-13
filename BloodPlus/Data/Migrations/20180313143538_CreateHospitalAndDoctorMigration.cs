using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BloodPlus.Data.Migrations
{
    public partial class CreateHospitalAndDoctorMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdAdress",
                table: "Hospitals");

            migrationBuilder.DropColumn(
                name: "IdHospital",
                table: "Doctors");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdAdress",
                table: "Hospitals",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdHospital",
                table: "Doctors",
                nullable: false,
                defaultValue: 0);
        }
    }
}
