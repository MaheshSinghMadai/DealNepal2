using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagement.Migrations
{
    public partial class Naya : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "Products",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProductsViewModel",
                columns: table => new
                {
                    ProductsProductID = table.Column<int>(nullable: true),
                    BidsBidID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_ProductsViewModel_Bids_BidsBidID",
                        column: x => x.BidsBidID,
                        principalTable: "Bids",
                        principalColumn: "BidID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductsViewModel_Products_ProductsProductID",
                        column: x => x.ProductsProductID,
                        principalTable: "Products",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_UserID",
                table: "Products",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_ProductsViewModel_BidsBidID",
                table: "ProductsViewModel",
                column: "BidsBidID");

            migrationBuilder.CreateIndex(
                name: "IX_ProductsViewModel_ProductsProductID",
                table: "ProductsViewModel",
                column: "ProductsProductID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_UserID",
                table: "Products",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_UserID",
                table: "Products");

            migrationBuilder.DropTable(
                name: "ProductsViewModel");

            migrationBuilder.DropIndex(
                name: "IX_Products_UserID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Products");
        }
    }
}
