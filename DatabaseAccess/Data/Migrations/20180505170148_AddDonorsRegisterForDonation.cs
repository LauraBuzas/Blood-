using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class AddDonorsRegisterForDonation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Stage",
                table: "BloodBags",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DonorsRegistrationsForDonation",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DonorName = table.Column<string>(nullable: true),
                    RegistrationDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonorsRegistrationsForDonation", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DonorsRegistrationsForDonation");

            migrationBuilder.DropColumn(
                name: "Stage",
                table: "BloodBags");
        }
    }
}
