using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class AddIdentityUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7", "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "b8c10928-5609-4d7c-8051-f0500b49fa0b", 0, "d0c4d174-ab92-4b8a-b438-3801618fa132", "nathan.roberts@gmail.com", false, false, null, "NATHAN.ROBERTS@GMAIL.COM", "NATHAN.ROBERTS@GMAIL.COM", "AQAAAAEAACcQAAAAEBkEbCfAudIyZ0Qz/bx2Nr8toMPAuQf3RoCrNDswSwn5Tdn0ZNdfy/51Se1MsshULQ==", null, false, "SHNK3GMI3EAPFETOSCG36NR53ZYY3DN6", false, "nathan.roberts@gmail.com" },
                    { "f6e4ac6a-d229-4e79-bb3d-1b58920918d7", 0, "e0797c37-76cb-4814-b22e-de5344b5e2a0", "gmail@bean.mr", false, false, null, "GMAIL@BEAN.MR", "GMAIL@BEAN.MR", "AQAAAAEAACcQAAAAEBkEbCfAudIyZ0Qz/bx2Nr8toMPAuQf3RoCrNDswSwn5Tdn0ZNdfy/51Se1MsshULQ==", null, false, "SHNK3GMI3EAPFETOSCG36NR53ZYY3DN6", false, "gmail@bean.mr" },
                    { "09ecbf1a-320a-4633-b749-1960d7cb2804", 0, "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7", "admin@library.com", false, false, null, "ADMIN@LIBRARY.COM", "ADMIN@LIBRARY.COM", "AQAAAAEAACcQAAAAEBkEbCfAudIyZ0Qz/bx2Nr8toMPAuQf3RoCrNDswSwn5Tdn0ZNdfy/51Se1MsshULQ==", null, false, "SHNK3GMI3EAPFETOSCG36NR53ZYY3DN6", false, "admin@library.com" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[] { "09ecbf1a-320a-4633-b749-1960d7cb2804", "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "AspNetUserId",
                value: "b8c10928-5609-4d7c-8051-f0500b49fa0b");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2,
                column: "AspNetUserId",
                value: "f6e4ac6a-d229-4e79-bb3d-1b58920918d7");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 3,
                column: "AspNetUserId",
                value: "09ecbf1a-320a-4633-b749-1960d7cb2804");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "09ecbf1a-320a-4633-b749-1960d7cb2804", "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "09ecbf1a-320a-4633-b749-1960d7cb2804");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b8c10928-5609-4d7c-8051-f0500b49fa0b");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f6e4ac6a-d229-4e79-bb3d-1b58920918d7");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "AspNetUserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2,
                column: "AspNetUserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 3,
                column: "AspNetUserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "AspNetUserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2,
                column: "AspNetUserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 3,
                column: "AspNetUserId",
                value: null);
        }
    }
}
