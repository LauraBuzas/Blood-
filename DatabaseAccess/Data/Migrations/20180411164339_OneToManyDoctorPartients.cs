using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class OneToManyDoctorPartients : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Patients",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdAddress",
                table: "Patients",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "IdDoctor",
                table: "Patients",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_AddressId",
                table: "Patients",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_IdDoctor",
                table: "Patients",
                column: "IdDoctor");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Addresses_AddressId",
                table: "Patients",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Doctors_IdDoctor",
                table: "Patients",
                column: "IdDoctor",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Addresses_AddressId",
                table: "Patients");

            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Doctors_IdDoctor",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_AddressId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_IdDoctor",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "IdAddress",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "IdDoctor",
                table: "Patients");
        }
    }
}
