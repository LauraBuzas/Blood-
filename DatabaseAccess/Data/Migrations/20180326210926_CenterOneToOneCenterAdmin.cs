using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class CenterOneToOneCenterAdmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CenterAdminId",
                table: "Centers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Centers_CenterAdminId",
                table: "Centers",
                column: "CenterAdminId",
                unique: true,
                filter: "[CenterAdminId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Centers_CenterAdmins_CenterAdminId",
                table: "Centers",
                column: "CenterAdminId",
                principalTable: "CenterAdmins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Centers_CenterAdmins_CenterAdminId",
                table: "Centers");

            migrationBuilder.DropIndex(
                name: "IX_Centers_CenterAdminId",
                table: "Centers");

            migrationBuilder.DropColumn(
                name: "CenterAdminId",
                table: "Centers");
        }
    }
}
