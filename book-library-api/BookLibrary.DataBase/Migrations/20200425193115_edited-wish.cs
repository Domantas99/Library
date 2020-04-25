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

            migrationBuilder.AlterColumn<int>(
                name: "CreatedBy",
                table: "Wish",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "Wish",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Wish",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NumberOfPages",
                table: "Book",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Wish_BookId",
                table: "Wish",
                column: "BookId",
                unique: true,
                filter: "[BookId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Wish_Book_BookId",
                table: "Wish",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
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

            migrationBuilder.AlterColumn<int>(
                name: "CreatedBy",
                table: "Wish",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NumberOfPages",
                table: "Book",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Wish_Id",
                table: "Wish",
                column: "Id",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }
    }
}
