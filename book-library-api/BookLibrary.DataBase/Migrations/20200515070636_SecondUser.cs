using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class SecondUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "Email", "FullName", "GoodReadsAccount", "OfficeId", "PhoneNumber", "ProfilePictureUrl", "Role", "UserName" },
                values: new object[] { 2, "gmail@bean.mr", "Mr. Bean", "https://www.goodreads.com/", 1, "+3707654321", "https://vignette.wikia.nocookie.net/mrbean/images/4/4b/Mr_beans_holiday_ver2.jpg/revision/latest?cb=20181130033425", "Full-Time Disaster", "Beanz" });
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
