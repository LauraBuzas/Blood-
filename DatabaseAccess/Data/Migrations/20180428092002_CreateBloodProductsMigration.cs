using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class CreateBloodProductsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Plasmas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BloodType = table.Column<int>(nullable: false),
                    ExpirationDateAndTime = table.Column<DateTime>(nullable: false),
                    SeparationDateAndTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plasmas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RedBloodCells",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BloodType = table.Column<int>(nullable: false),
                    ExpirationDateAndTime = table.Column<DateTime>(nullable: false),
                    RhType = table.Column<int>(nullable: false),
                    SeparationDateAndTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RedBloodCells", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Thrombocytes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BloodType = table.Column<int>(nullable: false),
                    ExpirationDateAndTime = table.Column<DateTime>(nullable: false),
                    RhType = table.Column<int>(nullable: false),
                    SeparationDateAndTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Thrombocytes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Plasmas");

            migrationBuilder.DropTable(
                name: "RedBloodCells");

            migrationBuilder.DropTable(
                name: "Thrombocytes");
        }
    }
}
