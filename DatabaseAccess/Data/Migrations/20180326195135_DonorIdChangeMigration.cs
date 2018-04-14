using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class DonorIdChangeMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<string>(
            //    name: "Id",
            //    table: "Donors",
            //    nullable: false,
            //    oldClrType: typeof(int))
            //    .OldAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.DropPrimaryKey("PK_Donors", "Donors");

            migrationBuilder.DropColumn("Id", "Donors");

            migrationBuilder.AddColumn<string>(name: "Id", table: "Donors", nullable: false);

            migrationBuilder.AddPrimaryKey(name: "PK_Donors", table: "Donors", column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey("PK_Donors", "Donors");

            migrationBuilder.DropColumn("Id", "Donors");

            migrationBuilder.AddColumn<int>("Id", "Donors");

            migrationBuilder.AddPrimaryKey("PK_Donors", "Donors", "Id");


            //migrationBuilder.AlterColumn<int>(
            //    name: "Id",
            //    table: "Donors",
            //    nullable: false,
            //    oldClrType: typeof(string))
            //    .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);
        }
    }
}
