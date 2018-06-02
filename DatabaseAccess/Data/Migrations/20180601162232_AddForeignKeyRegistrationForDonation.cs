using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class AddForeignKeyRegistrationForDonation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DonorId",
                table: "DonorsRegistrationsForDonation",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DonorsRegistrationsForDonation_DonorId",
                table: "DonorsRegistrationsForDonation",
                column: "DonorId");

            migrationBuilder.AddForeignKey(
                name: "FK_DonorsRegistrationsForDonation_Donors_DonorId",
                table: "DonorsRegistrationsForDonation",
                column: "DonorId",
                principalTable: "Donors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DonorsRegistrationsForDonation_Donors_DonorId",
                table: "DonorsRegistrationsForDonation");

            migrationBuilder.DropIndex(
                name: "IX_DonorsRegistrationsForDonation_DonorId",
                table: "DonorsRegistrationsForDonation");

            migrationBuilder.DropColumn(
                name: "DonorId",
                table: "DonorsRegistrationsForDonation");
        }
    }
}
