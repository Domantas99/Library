using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class ChangeUserVotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_UserWish_UserId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_Wish_UserWish_WishId",
                table: "Wish");

            migrationBuilder.DropIndex(
                name: "IX_Wish_WishId",
                table: "Wish");

            migrationBuilder.DropIndex(
                name: "IX_User_UserId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "WishId",
                table: "Wish");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "User");

            migrationBuilder.CreateIndex(
                name: "IX_UserWish_UserId",
                table: "UserWish",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserWish_WishId",
                table: "UserWish",
                column: "WishId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserWish_UserId",
                table: "UserWish",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserWish_WishId",
                table: "UserWish",
                column: "WishId",
                principalTable: "Wish",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserWish_UserId",
                table: "UserWish");

            migrationBuilder.DropForeignKey(
                name: "FK_UserWish_WishId",
                table: "UserWish");

            migrationBuilder.DropIndex(
                name: "IX_UserWish_UserId",
                table: "UserWish");

            migrationBuilder.DropIndex(
                name: "IX_UserWish_WishId",
                table: "UserWish");

            migrationBuilder.AddColumn<int>(
                name: "WishId",
                table: "Wish",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Wish_WishId",
                table: "Wish",
                column: "WishId");

            migrationBuilder.CreateIndex(
                name: "IX_User_UserId",
                table: "User",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_UserWish_UserId",
                table: "User",
                column: "UserId",
                principalTable: "UserWish",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Wish_UserWish_WishId",
                table: "Wish",
                column: "WishId",
                principalTable: "UserWish",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
