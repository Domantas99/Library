using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibrary.DataBase.Migrations
{
    public partial class ReservationDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_BookCaseId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_UserId",
                table: "Reservation");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Reservation",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckedInOn",
                table: "Reservation",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<int>(
                name: "BookCaseId",
                table: "Reservation",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookCase_BookId",
                table: "BookCase",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_BookCase_OfficeId",
                table: "BookCase",
                column: "OfficeId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookCase_Book_BookId",
                table: "BookCase",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookCase_Office_OfficeId",
                table: "BookCase",
                column: "OfficeId",
                principalTable: "Office",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_BookCaseId",
                table: "Reservation",
                column: "BookCaseId",
                principalTable: "BookCase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_UserId",
                table: "Reservation",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookCase_Book_BookId",
                table: "BookCase");

            migrationBuilder.DropForeignKey(
                name: "FK_BookCase_Office_OfficeId",
                table: "BookCase");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_BookCaseId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_UserId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_BookCase_BookId",
                table: "BookCase");

            migrationBuilder.DropIndex(
                name: "IX_BookCase_OfficeId",
                table: "BookCase");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Reservation",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckedInOn",
                table: "Reservation",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BookCaseId",
                table: "Reservation",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_BookCaseId",
                table: "Reservation",
                column: "BookCaseId",
                principalTable: "BookCase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_UserId",
                table: "Reservation",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
