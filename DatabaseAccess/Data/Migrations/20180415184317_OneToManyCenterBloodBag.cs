using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class OneToManyCenterBloodBag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CenterId",
                table: "BloodBags",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BloodBags_CenterId",
                table: "BloodBags",
                column: "CenterId");

            migrationBuilder.AddForeignKey(
                name: "FK_BloodBags_Centers_CenterId",
                table: "BloodBags",
                column: "CenterId",
                principalTable: "Centers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BloodBags_Centers_CenterId",
                table: "BloodBags");

            migrationBuilder.DropIndex(
                name: "IX_BloodBags_CenterId",
                table: "BloodBags");

            migrationBuilder.DropColumn(
                name: "CenterId",
                table: "BloodBags");
        }
    }
}
