using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class OneToOneAnalysisBloodBag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BloodBagId",
                table: "MedicalAnalyses",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalAnalyses_BloodBagId",
                table: "MedicalAnalyses",
                column: "BloodBagId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalAnalyses_BloodBags_BloodBagId",
                table: "MedicalAnalyses",
                column: "BloodBagId",
                principalTable: "BloodBags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalAnalyses_BloodBags_BloodBagId",
                table: "MedicalAnalyses");

            migrationBuilder.DropIndex(
                name: "IX_MedicalAnalyses_BloodBagId",
                table: "MedicalAnalyses");

            migrationBuilder.DropColumn(
                name: "BloodBagId",
                table: "MedicalAnalyses");
        }
    }
}
