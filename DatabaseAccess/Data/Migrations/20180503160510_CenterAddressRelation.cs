using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class CenterAddressRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdAddress",
                table: "Centers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Centers_IdAddress",
                table: "Centers",
                column: "IdAddress",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Centers_Addresses_IdAddress",
                table: "Centers",
                column: "IdAddress",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Centers_Addresses_IdAddress",
                table: "Centers");

            migrationBuilder.DropIndex(
                name: "IX_Centers_IdAddress",
                table: "Centers");

            migrationBuilder.DropColumn(
                name: "IdAddress",
                table: "Centers");
        }
    }
}
