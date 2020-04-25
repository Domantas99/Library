using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class editedwish : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wish_Id",
                table: "Wish");

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "Wish",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Wish",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Wish_BookId",
                table: "Wish",
                column: "BookId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Wish_Book_BookId",
                table: "Wish",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wish_Book_BookId",
                table: "Wish");

            migrationBuilder.DropIndex(
                name: "IX_Wish_BookId",
                table: "Wish");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "Wish");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Wish");

            migrationBuilder.AddForeignKey(
                name: "FK_Wish_Id",
                table: "Wish",
                column: "Id",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
