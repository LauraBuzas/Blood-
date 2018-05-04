using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class CenterComponentsRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CenterId",
                table: "Thrombocytes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CenterId",
                table: "RedBloodCells",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CenterId",
                table: "Plasmas",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Thrombocytes_CenterId",
                table: "Thrombocytes",
                column: "CenterId");

            migrationBuilder.CreateIndex(
                name: "IX_RedBloodCells_CenterId",
                table: "RedBloodCells",
                column: "CenterId");

            migrationBuilder.CreateIndex(
                name: "IX_Plasmas_CenterId",
                table: "Plasmas",
                column: "CenterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plasmas_Centers_CenterId",
                table: "Plasmas",
                column: "CenterId",
                principalTable: "Centers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RedBloodCells_Centers_CenterId",
                table: "RedBloodCells",
                column: "CenterId",
                principalTable: "Centers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Thrombocytes_Centers_CenterId",
                table: "Thrombocytes",
                column: "CenterId",
                principalTable: "Centers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plasmas_Centers_CenterId",
                table: "Plasmas");

            migrationBuilder.DropForeignKey(
                name: "FK_RedBloodCells_Centers_CenterId",
                table: "RedBloodCells");

            migrationBuilder.DropForeignKey(
                name: "FK_Thrombocytes_Centers_CenterId",
                table: "Thrombocytes");

            migrationBuilder.DropIndex(
                name: "IX_Thrombocytes_CenterId",
                table: "Thrombocytes");

            migrationBuilder.DropIndex(
                name: "IX_RedBloodCells_CenterId",
                table: "RedBloodCells");

            migrationBuilder.DropIndex(
                name: "IX_Plasmas_CenterId",
                table: "Plasmas");

            migrationBuilder.DropColumn(
                name: "CenterId",
                table: "Thrombocytes");

            migrationBuilder.DropColumn(
                name: "CenterId",
                table: "RedBloodCells");

            migrationBuilder.DropColumn(
                name: "CenterId",
                table: "Plasmas");
        }
    }
}
