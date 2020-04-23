using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class addedofficeadress2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 1,
                column: "FullAddress",
                value: "11d. Juozapaviciaus pr., Kaunas, LT-45252, Lithuania");

            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 2,
                column: "FullAddress",
                value: "135 Zalgirio g., Vilnius, LT-08217, Lithuania");

            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 3,
                column: "FullAddress",
                value: "8 Devonshire Square, London, EC2M 4PL, United Kingdom");

            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 4,
                column: "FullAddress",
                value: "36 Toronto Street Suite 260, Toronto, Ontario M5C 2C5, Canada");

            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 5,
                column: "FullAddress",
                value: "350 N Orleans St, Suite 7500S, Chicago, IL 60654, United States");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 1,
                column: "FullAddress",
                value: null);

            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 2,
                column: "FullAddress",
                value: null);

            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 3,
                column: "FullAddress",
                value: null);

            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 4,
                column: "FullAddress",
                value: null);

            migrationBuilder.UpdateData(
                table: "Office",
                keyColumn: "Id",
                keyValue: 5,
                column: "FullAddress",
                value: null);
        }
    }
}
