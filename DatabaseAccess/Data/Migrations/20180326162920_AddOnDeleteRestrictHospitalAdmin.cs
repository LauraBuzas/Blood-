using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class AddOnDeleteRestrictHospitalAdmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hospitals_HospitalAdmins_HospitalAdminId",
                table: "Hospitals");

            migrationBuilder.AddForeignKey(
                name: "FK_Hospitals_HospitalAdmins_HospitalAdminId",
                table: "Hospitals",
                column: "HospitalAdminId",
                principalTable: "HospitalAdmins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hospitals_HospitalAdmins_HospitalAdminId",
                table: "Hospitals");

            migrationBuilder.AddForeignKey(
                name: "FK_Hospitals_HospitalAdmins_HospitalAdminId",
                table: "Hospitals",
                column: "HospitalAdminId",
                principalTable: "HospitalAdmins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
