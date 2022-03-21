using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagement.Migrations
{
    public partial class UserActivity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_LatestBidderId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_LatestBidderId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "LatestBidderId",
                table: "Products");

            migrationBuilder.CreateTable(
                name: "UserActivities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(nullable: true),
                    Data = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    IpAddress = table.Column<string>(nullable: true),
                    ActivityDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserActivities", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserActivities");

            migrationBuilder.AddColumn<string>(
                name: "LatestBidderId",
                table: "Products",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_LatestBidderId",
                table: "Products",
                column: "LatestBidderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_LatestBidderId",
                table: "Products",
                column: "LatestBidderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
