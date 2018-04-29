using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class OneToManyPatientRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Doctors_IdDoctor",
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

            migrationBuilder.CreateIndex(
                name: "IX_Requests_IdPatient",
                table: "Requests",
                column: "IdPatient");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Requests_IdPatient",
                table: "Requests");

            migrationBuilder.AddColumn<string>(
                name: "IdDoctor",
                table: "Requests",
                nullable: true);

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
        }
    }
}
