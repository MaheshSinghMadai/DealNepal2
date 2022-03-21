using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagement.Migrations
{
    public partial class NewDbssss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products_Bids");

            migrationBuilder.AddColumn<int>(
                name: "ProductID",
                table: "Bids",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductID",
                table: "Bids");

            migrationBuilder.CreateTable(
                name: "Products_Bids",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    BidID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products_Bids", x => new { x.ProductID, x.BidID });
                    table.ForeignKey(
                        name: "FK_Products_Bids_Bids_BidID",
                        column: x => x.BidID,
                        principalTable: "Bids",
                        principalColumn: "BidID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Bids_Products_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_Bids_BidID",
                table: "Products_Bids",
                column: "BidID");
        }
    }
}
