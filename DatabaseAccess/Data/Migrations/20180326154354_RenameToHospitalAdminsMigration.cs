using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class RenameToHospitalAdminsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HospitalAdmin_AspNetUsers_Id",
                table: "HospitalAdmin");

            migrationBuilder.DropForeignKey(
                name: "FK_Hospitals_HospitalAdmin_HospitalAdminId",
                table: "Hospitals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HospitalAdmin",
                table: "HospitalAdmin");

            migrationBuilder.RenameTable(
                name: "HospitalAdmin",
                newName: "HospitalAdmins");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HospitalAdmins",
                table: "HospitalAdmins",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HospitalAdmins_AspNetUsers_Id",
                table: "HospitalAdmins",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_HospitalAdmins_AspNetUsers_Id",
                table: "HospitalAdmins");

            migrationBuilder.DropForeignKey(
                name: "FK_Hospitals_HospitalAdmins_HospitalAdminId",
                table: "Hospitals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HospitalAdmins",
                table: "HospitalAdmins");

            migrationBuilder.RenameTable(
                name: "HospitalAdmins",
                newName: "HospitalAdmin");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HospitalAdmin",
                table: "HospitalAdmin",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HospitalAdmin_AspNetUsers_Id",
                table: "HospitalAdmin",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Hospitals_HospitalAdmin_HospitalAdminId",
                table: "Hospitals",
                column: "HospitalAdminId",
                principalTable: "HospitalAdmin",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
