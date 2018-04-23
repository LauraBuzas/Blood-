using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatabaseAccess.Data.Migrations
{
    public partial class EmployeeIdChangeMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<string>(
            //    name: "Id",
            //    table: "Employees",
            //    nullable: false,
            //    oldClrType: typeof(int))
            //    .OldAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);
            migrationBuilder.DropPrimaryKey("PK_Employees", "Employees");

            migrationBuilder.DropColumn("Id", "Employees");

            migrationBuilder.AddColumn<string>(name: "Id", table: "Employees", nullable: false);

            migrationBuilder.AddPrimaryKey(name: "PK_Employee", table: "Employees", column: "Id");
        }


        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey("PK_Employees", "Employees");

            migrationBuilder.DropColumn("Id", "Employees");

            migrationBuilder.AddColumn<int>("Id", "Employees");

            migrationBuilder.AddPrimaryKey("PK_Employees", "Employees", "Id");

            //migrationBuilder.AlterColumn<int>(
            //    name: "Id",
            //    table: "Employees",
            //    nullable: false,
            //    oldClrType: typeof(string))
            //    .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);
        }
    }
}
