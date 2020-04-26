using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class AddUserVotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WishId",
                table: "Wish",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "User",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserWish",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    WishId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWish", x => x.Id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_UserWish_UserId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_Wish_UserWish_WishId",
                table: "Wish");

            migrationBuilder.DropTable(
                name: "UserWish");

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
        }
    }
}
