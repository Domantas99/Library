using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class addeduserprops : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_User_UserWish_UserId",
            //    table: "User");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Wish_UserWish_WishId",
            //    table: "Wish");

            //migrationBuilder.DropIndex(
            //    name: "IX_Wish_WishId",
            //    table: "Wish");

            //migrationBuilder.DropIndex(
            //    name: "IX_User_UserId",
            //    table: "User");

            //migrationBuilder.DropColumn(
            //    name: "WishId",
            //    table: "Wish");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "User");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "User");

            //migrationBuilder.DropColumn(
            //    name: "UserId",
            //    table: "User");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "User",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GoodReadsAccount",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "User",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "FullName", "GoodReadsAccount", "PhoneNumber", "ProfilePictureUrl", "Role" },
                values: new object[] { "Nathan Roberts", "https://www.goodreads.com/", "+3701234567", "https://randomuser.me/api/portraits/men/94.jpg", "Full-Stack Developer" });

            //migrationBuilder.CreateIndex(
            //    name: "IX_UserWish_UserId",
            //    table: "UserWish",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_UserWish_WishId",
            //    table: "UserWish",
            //    column: "WishId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_UserWish_UserId",
            //    table: "UserWish",
            //    column: "UserId",
            //    principalTable: "User",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_UserWish_WishId",
            //    table: "UserWish",
            //    column: "WishId",
            //    principalTable: "Wish",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_UserWish_UserId",
            //    table: "UserWish");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_UserWish_WishId",
            //    table: "UserWish");

            //migrationBuilder.DropIndex(
            //    name: "IX_UserWish_UserId",
            //    table: "UserWish");

            //migrationBuilder.DropIndex(
            //    name: "IX_UserWish_WishId",
            //    table: "UserWish");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "User");

            migrationBuilder.DropColumn(
                name: "GoodReadsAccount",
                table: "User");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "User");

            //migrationBuilder.AddColumn<int>(
            //    name: "WishId",
            //    table: "Wish",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "FirstName",
            //    table: "User",
            //    type: "nvarchar(250)",
            //    maxLength: 250,
            //    nullable: false,
            //    defaultValue: "");

            //migrationBuilder.AddColumn<string>(
            //    name: "LastName",
            //    table: "User",
            //    type: "nvarchar(250)",
            //    maxLength: 250,
            //    nullable: false,
            //    defaultValue: "");

            //migrationBuilder.AddColumn<int>(
            //    name: "UserId",
            //    table: "User",
            //    type: "int",
            //    nullable: true);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "FirstName", "LastName", "ProfilePictureUrl" },
                values: new object[] { "Nathan", "Roberts", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqU9vOT5KpsmRjJMa7rj_NYuWWhJcB3qWAL21QtcH9ZNXuhQZO&usqp=CAU" });

            //migrationBuilder.CreateIndex(
            //    name: "IX_Wish_WishId",
            //    table: "Wish",
            //    column: "WishId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_User_UserId",
            //    table: "User",
            //    column: "UserId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_User_UserWish_UserId",
            //    table: "User",
            //    column: "UserId",
            //    principalTable: "UserWish",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Wish_UserWish_WishId",
            //    table: "Wish",
            //    column: "WishId",
            //    principalTable: "UserWish",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }
    }
}
