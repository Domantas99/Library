using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class CommentUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "BookComment",
                newName: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BookComment_UserId",
                table: "BookComment",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookComment_User_UserId",
                table: "BookComment",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookComment_User_UserId",
                table: "BookComment");

            migrationBuilder.DropIndex(
                name: "IX_BookComment_UserId",
                table: "BookComment");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "BookComment",
                newName: "CreatedBy");
        }
    }
}
