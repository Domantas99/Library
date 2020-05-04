using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class editeduser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoodReadsAccount",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilePictureUrl",
                table: "User",
                maxLength: 300,
                nullable: true);

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "OfficeId", "ProfilePictureUrl", "UserId", "UserName" },
                values: new object[] { 1, "nathan.roberts@gmail.com", "Nathan", "Roberts", 1, "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqU9vOT5KpsmRjJMa7rj_NYuWWhJcB3qWAL21QtcH9ZNXuhQZO&usqp=CAU", null, "Nathaniux123" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "Email",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ProfilePictureUrl",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "GoodReadsAccount",
                table: "User",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: true);
        }
    }
}
