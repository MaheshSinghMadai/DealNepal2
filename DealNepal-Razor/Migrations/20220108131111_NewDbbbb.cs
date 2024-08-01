using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagement.Migrations
{
    public partial class NewDbbbb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_AspNetUsers_UserId",
                table: "Bids");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Bids",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Bids_UserId",
                table: "Bids",
                newName: "IX_Bids_UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_AspNetUsers_UserID",
                table: "Bids",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_AspNetUsers_UserID",
                table: "Bids");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Bids",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Bids_UserID",
                table: "Bids",
                newName: "IX_Bids_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_AspNetUsers_UserId",
                table: "Bids",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
