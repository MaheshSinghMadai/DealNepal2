using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagement.Migrations
{
    public partial class Newschemaaadaa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductsViewModel");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductsViewModel",
                columns: table => new
                {
                    BidsBidID = table.Column<int>(type: "int", nullable: true),
                    ProductsProductID = table.Column<int>(type: "int", nullable: true)
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
                name: "IX_ProductsViewModel_BidsBidID",
                table: "ProductsViewModel",
                column: "BidsBidID");

            migrationBuilder.CreateIndex(
                name: "IX_ProductsViewModel_ProductsProductID",
                table: "ProductsViewModel",
                column: "ProductsProductID");
        }
    }
}
