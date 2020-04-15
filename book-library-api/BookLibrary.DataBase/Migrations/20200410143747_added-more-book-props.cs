using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class addedmorebookprops : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Format",
                table: "Book",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfPages",
                table: "Book",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Series",
                table: "Book",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Format",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "NumberOfPages",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "Series",
                table: "Book");
        }
    }
}
