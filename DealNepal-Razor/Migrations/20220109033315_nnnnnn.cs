using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagement.Migrations
{
    public partial class nnnnnn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_Products_ProductsProductID",
                table: "Bids");

            migrationBuilder.DropForeignKey(
                name: "FK_Bids_AspNetUsers_UserID",
                table: "Bids");

            migrationBuilder.DropIndex(
                name: "IX_Bids_ProductsProductID",
                table: "Bids");

            migrationBuilder.DropIndex(
                name: "IX_Bids_UserID",
                table: "Bids");

            migrationBuilder.DropColumn(
                name: "ProductsProductID",
                table: "Bids");

            migrationBuilder.AlterColumn<string>(
                name: "UserID",
                table: "Bids",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bids_ProductID",
                table: "Bids",
                column: "ProductID");

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_Products_ProductID",
                table: "Bids",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "ProductID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_Products_ProductID",
                table: "Bids");

            migrationBuilder.DropIndex(
                name: "IX_Bids_ProductID",
                table: "Bids");

            migrationBuilder.AlterColumn<string>(
                name: "UserID",
                table: "Bids",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductsProductID",
                table: "Bids",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bids_ProductsProductID",
                table: "Bids",
                column: "ProductsProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Bids_UserID",
                table: "Bids",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_Products_ProductsProductID",
                table: "Bids",
                column: "ProductsProductID",
                principalTable: "Products",
                principalColumn: "ProductID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_AspNetUsers_UserID",
                table: "Bids",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
