using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class ChangeWaitingToHaveBookCase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Waiting_BookId",
                table: "Waiting");

            migrationBuilder.DropIndex(
                name: "IX_Waiting_BookId",
                table: "Waiting");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "Waiting");

            migrationBuilder.AddColumn<int>(
                name: "BookCaseId",
                table: "Waiting",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Waiting_BookCaseId",
                table: "Waiting",
                column: "BookCaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Waiting_BookCaseId",
                table: "Waiting",
                column: "BookCaseId",
                principalTable: "BookCase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Waiting_BookCaseId",
                table: "Waiting");

            migrationBuilder.DropIndex(
                name: "IX_Waiting_BookCaseId",
                table: "Waiting");

            migrationBuilder.DropColumn(
                name: "BookCaseId",
                table: "Waiting");

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "Waiting",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Waiting_BookId",
                table: "Waiting",
                column: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Waiting_BookId",
                table: "Waiting",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
