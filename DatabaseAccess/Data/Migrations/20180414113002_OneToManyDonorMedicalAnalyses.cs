using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class OneToManyDonorMedicalAnalyses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnalysisId",
                table: "BloodBags");

            migrationBuilder.AlterColumn<bool>(
                name: "ALTLevel",
                table: "MedicalAnalyses",
                nullable: false,
                oldClrType: typeof(float));

            migrationBuilder.AddColumn<string>(
                name: "DonorId",
                table: "MedicalAnalyses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalAnalyses_DonorId",
                table: "MedicalAnalyses",
                column: "DonorId");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalAnalyses_Donors_DonorId",
                table: "MedicalAnalyses",
                column: "DonorId",
                principalTable: "Donors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalAnalyses_Donors_DonorId",
                table: "MedicalAnalyses");

            migrationBuilder.DropIndex(
                name: "IX_MedicalAnalyses_DonorId",
                table: "MedicalAnalyses");

            migrationBuilder.DropColumn(
                name: "DonorId",
                table: "MedicalAnalyses");

            migrationBuilder.AlterColumn<float>(
                name: "ALTLevel",
                table: "MedicalAnalyses",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<int>(
                name: "AnalysisId",
                table: "BloodBags",
                nullable: false,
                defaultValue: 0);
        }
    }
}
