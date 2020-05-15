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
    [Migration("20200515070636_SecondUser")]
    partial class SecondUser
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

                    b.Property<string>("EditionLanguage")
                        .HasColumnType("nvarchar(max)");

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

                    b.Property<int?>("NumberOfPages")
                        .HasColumnType("int");

                    b.Property<string>("Publisher")
                        .HasColumnType("nvarchar(max)");

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

                    b.HasIndex("BookId");

                    b.HasIndex("OfficeId");

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

                    b.Property<string>("FullAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.ToTable("Office");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FullAddress = "11d. Juozapaviciaus pr., Kaunas, LT-45252, Lithuania",
                            Name = "Kaunas"
                        },
                        new
                        {
                            Id = 2,
                            FullAddress = "135 Zalgirio g., Vilnius, LT-08217, Lithuania",
                            Name = "Vilnius"
                        },
                        new
                        {
                            Id = 3,
                            FullAddress = "8 Devonshire Square, London, EC2M 4PL, United Kingdom",
                            Name = "London"
                        },
                        new
                        {
                            Id = 4,
                            FullAddress = "36 Toronto Street Suite 260, Toronto, Ontario M5C 2C5, Canada",
                            Name = "Toronto"
                        },
                        new
                        {
                            Id = 5,
                            FullAddress = "350 N Orleans St, Suite 7500S, Chicago, IL 60654, United States",
                            Name = "Chicago"
                        });
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookCaseId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CheckedInOn")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("CheckedOutOn")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("PlannedReturnOn")
                        .HasColumnType("datetime");

                    b.Property<int>("UserId")
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

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<string>("GoodReadsAccount")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OfficeId")
                        .HasColumnType("int");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfilePictureUrl")
                        .HasColumnType("nvarchar(300)")
                        .HasMaxLength(300);

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.HasIndex("OfficeId");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "nathan.roberts@gmail.com",
                            FullName = "Nathan Roberts",
                            GoodReadsAccount = "https://www.goodreads.com/",
                            OfficeId = 1,
                            PhoneNumber = "+3701234567",
                            ProfilePictureUrl = "https://randomuser.me/api/portraits/men/94.jpg",
                            Role = "Full-Stack Developer",
                            UserName = "Nathaniux123"
                        },
                        new
                        {
                            Id = 2,
                            Email = "gmail@bean.mr",
                            FullName = "Mr. Bean",
                            GoodReadsAccount = "https://www.goodreads.com/",
                            OfficeId = 1,
                            PhoneNumber = "+3707654321",
                            ProfilePictureUrl = "https://vignette.wikia.nocookie.net/mrbean/images/4/4b/Mr_beans_holiday_ver2.jpg/revision/latest?cb=20181130033425",
                            Role = "Full-Time Disaster",
                            UserName = "Beanz"
                        });
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.UserWish", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("WishId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("WishId");

                    b.ToTable("UserWish");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Waiting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookCaseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookCaseId");

                    b.HasIndex("UserId");

                    b.ToTable("Waiting");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Wish", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BookId")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.HasIndex("BookId")
                        .IsUnique()
                        .HasFilter("[BookId] IS NOT NULL");

                    b.ToTable("Wish");
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.BookCase", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Book", "Book")
                        .WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookLibrary.DataBase.Models.Office", "Office")
                        .WithMany()
                        .HasForeignKey("OfficeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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
                        .HasConstraintName("FK_Reservation_BookCaseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookLibrary.DataBase.Models.User", "User")
                        .WithMany("Reservation")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_Reservation_UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.User", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Office", "Office")
                        .WithMany("User")
                        .HasForeignKey("OfficeId")
                        .HasConstraintName("FK_User_OfficeId")
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.UserWish", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.User", "User")
                        .WithMany("UserWish")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_UserWish_UserId")
                        .IsRequired();

                    b.HasOne("BookLibrary.DataBase.Models.Wish", "Wish")
                        .WithMany("Votes")
                        .HasForeignKey("WishId")
                        .HasConstraintName("FK_UserWish_WishId")
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Waiting", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.BookCase", "BookCase")
                        .WithMany("Waiting")
                        .HasForeignKey("BookCaseId")
                        .HasConstraintName("FK_Waiting_BookCaseId")
                        .IsRequired();

                    b.HasOne("BookLibrary.DataBase.Models.User", "User")
                        .WithMany("Waiting")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_Waiting_UserId")
                        .IsRequired();
                });

            modelBuilder.Entity("BookLibrary.DataBase.Models.Wish", b =>
                {
                    b.HasOne("BookLibrary.DataBase.Models.Book", "Book")
                        .WithOne("Wish")
                        .HasForeignKey("BookLibrary.DataBase.Models.Wish", "BookId");
                });
#pragma warning restore 612, 618
        }
    }
}
