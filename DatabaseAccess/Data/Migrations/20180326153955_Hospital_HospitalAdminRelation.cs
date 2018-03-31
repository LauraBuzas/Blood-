using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class Hospital_HospitalAdminRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HospitalAdminId",
                table: "Hospitals",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Hospitals_HospitalAdminId",
                table: "Hospitals",
                column: "HospitalAdminId",
                unique: true,
                filter: "[HospitalAdminId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Hospitals_HospitalAdmin_HospitalAdminId",
                table: "Hospitals",
                column: "HospitalAdminId",
                principalTable: "HospitalAdmin",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hospitals_HospitalAdmin_HospitalAdminId",
                table: "Hospitals");

            migrationBuilder.DropIndex(
                name: "IX_Hospitals_HospitalAdminId",
                table: "Hospitals");

            migrationBuilder.DropColumn(
                name: "HospitalAdminId",
                table: "Hospitals");
        }
    }
}
