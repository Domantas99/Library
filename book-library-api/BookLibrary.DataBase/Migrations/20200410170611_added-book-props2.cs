using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class addedbookprops2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EditionLanguage",
                table: "Book",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Publisher",
                table: "Book",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EditionLanguage",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "Publisher",
                table: "Book");
        }
    }
}
