using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class RequestDoctorPatientRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Requests",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<int>(
                name: "BloodType",
                table: "Requests",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdDoctor",
                table: "Requests",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdPatient",
                table: "Requests",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rh",
                table: "Requests",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_IdDoctor",
                table: "Requests",
                column: "IdDoctor");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_IdPatient",
                table: "Requests",
                column: "IdPatient",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Doctors_IdDoctor",
                table: "Requests",
                column: "IdDoctor",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Patients_IdPatient",
                table: "Requests",
                column: "IdPatient",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Doctors_IdDoctor",
                table: "Requests");

            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Patients_IdPatient",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_IdDoctor",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_IdPatient",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "IdDoctor",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "IdPatient",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "Rh",
                table: "Requests");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Requests",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "BloodType",
                table: "Requests",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
