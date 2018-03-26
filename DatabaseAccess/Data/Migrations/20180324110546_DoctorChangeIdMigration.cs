using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class DoctorChangeIdMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey("PK_Doctors","Doctors");

            migrationBuilder.DropColumn("Id", "Doctors");

            migrationBuilder.AddColumn<string>(name:"Id", table: "Doctors", nullable: false);

            migrationBuilder.AddPrimaryKey(name: "PK_Doctors", table: "Doctors",column:"Id");

            //migrationBuilder.AlterColumn<string>(
            //    name: "Id",
            //    table: "Doctors",
            //    nullable: false,
            //    oldClrType: typeof(int))
            //    .OldAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey("PK_Doctors", "Doctors");

            migrationBuilder.DropColumn("Id", "Doctors");

            migrationBuilder.AddColumn<int>("Id", "Doctors");

            migrationBuilder.AddPrimaryKey("PK_Doctors", "Doctors","Id");


            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Doctors",
                nullable: false,
                oldClrType: typeof(string))
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);
        }
    }
}
