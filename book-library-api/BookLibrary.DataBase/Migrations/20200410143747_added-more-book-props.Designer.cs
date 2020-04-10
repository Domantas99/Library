﻿// <auto-generated />
using System;
using BookLibrary.DataBase.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BookLibrary.DataBase.Migrations
{
    [DbContext(typeof(LibraryDBContext))]
    [Migration("20200410143747_added-more-book-props")]
    partial class addedmorebookprops
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BookLibrary.DataBase.Models.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CoverPictureUrl")
                        .HasColumnName("CoverPictureURL")
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("Date");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(1000)")
                        .HasMaxLength(1000);

                    b.Property<string>("Format")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GoodReadsUrl")
                        .HasColumnName("GoodReadsURL")
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<string>("Isbn")
                        .HasColumnName("ISBN")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int>("NumberOfPages")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("Date");

                    b.Property<string>("Series")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tag")
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.ToTable("Book");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.BookCase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.Property<int?>("ModifiedBy")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime");

                    b.Property<int>("OfficeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("BookCase");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.BookCaseComment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookCaseId")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.HasIndex("BookCaseId");

                    b.ToTable("BookCaseComment");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.BookComment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.Property<int?>("Rating")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.ToTable("BookComment");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.BookWish", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.Property<int>("Vote")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.ToTable("BookWish");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Library", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.Property<int?>("ModifiedBy")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime");

                    b.Property<int>("OfficeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("OfficeId");

                    b.ToTable("Library");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.LibraryComment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.Property<int>("LibraryId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LibraryId");

                    b.ToTable("LibraryComment");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Office", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.ToTable("Office");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<int?>("BookCaseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CheckedInOn")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("CheckedOutOn")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("PlannedReturnOn")
                        .HasColumnType("datetime");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookCaseId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservation");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<string>("GoodReadsAccount")
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<int>("OfficeId")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.HasIndex("OfficeId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Waiting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("Waiting");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Wish", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.ToTable("Wish");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.BookCaseComment", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.BookCase", "BookCase")
                        .WithMany("BookCaseComment")
                        .HasForeignKey("BookCaseId")
                        .HasConstraintName("FK_BookCaseComments_BookCaseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.BookComment", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Book", "Book")
                        .WithMany("BookComment")
                        .HasForeignKey("BookId")
                        .HasConstraintName("FK_BookComment_Book")
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.BookWish", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Book", "Book")
                        .WithMany("BookWish")
                        .HasForeignKey("BookId")
                        .HasConstraintName("FK_BookWish_BookId")
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Library", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Book", "Book")
                        .WithMany("Library")
                        .HasForeignKey("BookId")
                        .HasConstraintName("FK_Library_BookId")
                        .IsRequired();

                    b.HasOne("BookLibrary.DataBase.Models.Office", "Office")
                        .WithMany("Library")
                        .HasForeignKey("OfficeId")
                        .HasConstraintName("FK_Library_OfficeId")
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.LibraryComment", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Library", "Library")
                        .WithMany("LibraryComment")
                        .HasForeignKey("LibraryId")
                        .HasConstraintName("FK_LibraryComment_LibraryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Reservation", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.BookCase", "BookCase")
                        .WithMany("Reservation")
                        .HasForeignKey("BookCaseId")
                        .HasConstraintName("FK_Reservation_BookCaseId");

                    b.HasOne("BookLibrary.DataBase.Models.User", "User")
                        .WithMany("Reservation")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_Reservation_UserId");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.User", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Office", "Office")
                        .WithMany("User")
                        .HasForeignKey("OfficeId")
                        .HasConstraintName("FK_User_OfficeId")
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Waiting", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Book", "Book")
                        .WithMany("Waiting")
                        .HasForeignKey("BookId")
                        .HasConstraintName("FK_Waiting_BookId")
                        .IsRequired();

                    b.HasOne("BookLibrary.DataBase.Models.User", "User")
                        .WithMany("Waiting")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_Waiting_UserId")
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Wish", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Book", "IdNavigation")
                        .WithOne("Wish")
                        .HasForeignKey("BookLibrary.DataBase.Models.Wish", "Id")
                        .HasConstraintName("FK_Wish_Id")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
