using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class addedadmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "User",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "Email", "FullName", "GoodReadsAccount", "IsAdmin", "OfficeId", "PhoneNumber", "ProfilePictureUrl", "Role", "UserName" },
                values: new object[] { 3, "admin@library.com", "Jon Mills", "https://www.goodreads.com/admin-lib", true, 1, "+37010101010", "https://randomuser.me/api/portraits/men/34.jpg", "Full-Time Admin", "MrAdmin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "User");
        }
    }
}
