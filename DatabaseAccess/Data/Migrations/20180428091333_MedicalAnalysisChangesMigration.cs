using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class MedicalAnalysisChangesMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Observations",
                table: "MedicalAnalyses",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RejectedOtherCauses",
                table: "MedicalAnalyses",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Observations",
                table: "MedicalAnalyses");

            migrationBuilder.DropColumn(
                name: "RejectedOtherCauses",
                table: "MedicalAnalyses");
        }
    }
}
