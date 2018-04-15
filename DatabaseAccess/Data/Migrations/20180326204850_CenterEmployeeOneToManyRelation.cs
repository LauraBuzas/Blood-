using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class CenterEmployeeOneToManyRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CenterId",
                table: "Employees",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_CenterId",
                table: "Employees",
                column: "CenterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Centers_CenterId",
                table: "Employees",
                column: "CenterId",
                principalTable: "Centers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Centers_CenterId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_CenterId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "CenterId",
                table: "Employees");
        }
    }
}
