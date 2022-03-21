using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagement.Migrations
{
    public partial class NewPId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_Products_ProductsProductID",
                table: "Bids");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Bids_ProductsProductID",
                table: "Bids");

            migrationBuilder.DropColumn(
                name: "ProductID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductsProductID",
                table: "Bids");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Products",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ProductsId",
                table: "Bids",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Bids_ProductsId",
                table: "Bids",
                column: "ProductsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_Products_ProductsId",
                table: "Bids",
                column: "ProductsId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_Products_ProductsId",
                table: "Bids");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Bids_ProductsId",
                table: "Bids");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductsId",
                table: "Bids");

            migrationBuilder.AddColumn<int>(
                name: "ProductID",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ProductsProductID",
                table: "Bids",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "ProductID");

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
