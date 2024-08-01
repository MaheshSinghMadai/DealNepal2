using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagement.Migrations
{
    public partial class SchemaChangeessssafafafgfah : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LatestBidderId",
                table: "Products",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
