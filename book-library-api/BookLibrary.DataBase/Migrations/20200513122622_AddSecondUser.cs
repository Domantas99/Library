using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class AddSecondUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FullName", "GoodReadsAccount", "PhoneNumber", "ProfilePictureUrl", "Role" },
                values: new object[] { "Mr. Bean", "https://www.goodreads.com/", "+3707654321", "https://vignette.wikia.nocookie.net/mrbean/images/4/4b/Mr_beans_holiday_ver2.jpg/revision/latest?cb=20181130033425", "Full-Time Disaster" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
