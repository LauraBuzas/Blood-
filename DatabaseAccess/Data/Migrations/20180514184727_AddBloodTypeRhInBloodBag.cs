using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class AddBloodTypeRhInBloodBag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnalysisId",
                table: "Thrombocytes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AnalysisId",
                table: "RedBloodCells",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AnalysisId",
                table: "Plasmas",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BloodType",
                table: "BloodBags",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RhType",
                table: "BloodBags",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Thrombocytes_AnalysisId",
                table: "Thrombocytes",
                column: "AnalysisId");

            migrationBuilder.CreateIndex(
                name: "IX_RedBloodCells_AnalysisId",
                table: "RedBloodCells",
                column: "AnalysisId");

            migrationBuilder.CreateIndex(
                name: "IX_Plasmas_AnalysisId",
                table: "Plasmas",
                column: "AnalysisId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plasmas_MedicalAnalyses_AnalysisId",
                table: "Plasmas",
                column: "AnalysisId",
                principalTable: "MedicalAnalyses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RedBloodCells_MedicalAnalyses_AnalysisId",
                table: "RedBloodCells",
                column: "AnalysisId",
                principalTable: "MedicalAnalyses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Thrombocytes_MedicalAnalyses_AnalysisId",
                table: "Thrombocytes",
                column: "AnalysisId",
                principalTable: "MedicalAnalyses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plasmas_MedicalAnalyses_AnalysisId",
                table: "Plasmas");

            migrationBuilder.DropForeignKey(
                name: "FK_RedBloodCells_MedicalAnalyses_AnalysisId",
                table: "RedBloodCells");

            migrationBuilder.DropForeignKey(
                name: "FK_Thrombocytes_MedicalAnalyses_AnalysisId",
                table: "Thrombocytes");

            migrationBuilder.DropIndex(
                name: "IX_Thrombocytes_AnalysisId",
                table: "Thrombocytes");

            migrationBuilder.DropIndex(
                name: "IX_RedBloodCells_AnalysisId",
                table: "RedBloodCells");

            migrationBuilder.DropIndex(
                name: "IX_Plasmas_AnalysisId",
                table: "Plasmas");

            migrationBuilder.DropColumn(
                name: "AnalysisId",
                table: "Thrombocytes");

            migrationBuilder.DropColumn(
                name: "AnalysisId",
                table: "RedBloodCells");

            migrationBuilder.DropColumn(
                name: "AnalysisId",
                table: "Plasmas");

            migrationBuilder.DropColumn(
                name: "BloodType",
                table: "BloodBags");

            migrationBuilder.DropColumn(
                name: "RhType",
                table: "BloodBags");
        }
    }
}
