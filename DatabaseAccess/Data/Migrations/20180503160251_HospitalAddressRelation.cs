using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class HospitalAddressRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdAddress",
                table: "Hospitals",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Stage",
                table: "BloodBags",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Hospitals_IdAddress",
                table: "Hospitals",
                column: "IdAddress",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Hospitals_Addresses_IdAddress",
                table: "Hospitals",
                column: "IdAddress",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hospitals_Addresses_IdAddress",
                table: "Hospitals");

            migrationBuilder.DropIndex(
                name: "IX_Hospitals_IdAddress",
                table: "Hospitals");

            migrationBuilder.DropColumn(
                name: "IdAddress",
                table: "Hospitals");

            migrationBuilder.DropColumn(
                name: "Stage",
                table: "BloodBags");
        }
    }
}
