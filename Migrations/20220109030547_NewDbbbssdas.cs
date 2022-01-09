using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagement.Migrations
{
    public partial class NewDbbbssdas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_Products_ProductsProductID",
                table: "Bids");

            migrationBuilder.DropIndex(
                name: "IX_Bids_ProductsProductID",
                table: "Bids");

            migrationBuilder.DropColumn(
                name: "ProductsProductID",
                table: "Bids");

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

            migrationBuilder.AddColumn<int>(
                name: "ProductsProductID",
                table: "Bids",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bids_ProductsProductID",
                table: "Bids",
                column: "ProductsProductID");

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_Products_ProductsProductID",
                table: "Bids",
                column: "ProductsProductID",
                principalTable: "Products",
                principalColumn: "ProductID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
