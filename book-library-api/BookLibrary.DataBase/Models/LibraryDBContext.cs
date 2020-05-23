using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace BookLibrary.DataBase.Models
{
    public partial class LibraryDBContext : IdentityDbContext<IdentityUser>
    {
        public LibraryDBContext()
        {
        }

        public LibraryDBContext(DbContextOptions<LibraryDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Book { get; set; }
        public virtual DbSet<BookCase> BookCase { get; set; }
        public virtual DbSet<BookCaseComment> BookCaseComment { get; set; }
        public virtual DbSet<BookComment> BookComment { get; set; }
        public virtual DbSet<BookWish> BookWish { get; set; }
        public virtual DbSet<Library> Library { get; set; }
        public virtual DbSet<LibraryComment> LibraryComment { get; set; }
        public virtual DbSet<Office> Office { get; set; }
        public virtual DbSet<Reservation> Reservation { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Waiting> Waiting { get; set; }
        public virtual DbSet<Wish> Wish { get; set; }
        public virtual DbSet<UserWish> UserWish { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
         
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Office>().HasData(
                new Office { Id = 1, Name = "Kaunas", FullAddress = "11d. Juozapaviciaus pr., Kaunas, LT-45252, Lithuania" },
                new Office { Id = 2, Name = "Vilnius", FullAddress = "135 Zalgirio g., Vilnius, LT-08217, Lithuania" },
                new Office { Id = 3, Name = "London", FullAddress = "8 Devonshire Square, London, EC2M 4PL, United Kingdom" },
                new Office { Id = 4, Name = "Toronto", FullAddress = "36 Toronto Street Suite 260, Toronto, Ontario M5C 2C5, Canada" },
                new Office { Id = 5, Name = "Chicago", FullAddress = "350 N Orleans St, Suite 7500S, Chicago, IL 60654, United States" }
                );

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7"
                }
                );

            // All passwords are the same - Password1!
            modelBuilder.Entity<IdentityUser>().HasData(
                new IdentityUser { 
                    Id = "b8c10928-5609-4d7c-8051-f0500b49fa0b",
                    UserName = "nathan.roberts@gmail.com",
                    NormalizedUserName = "NATHAN.ROBERTS@GMAIL.COM",
                    NormalizedEmail = "NATHAN.ROBERTS@GMAIL.COM",
                    Email = "nathan.roberts@gmail.com",
                    EmailConfirmed = false,
                    PasswordHash = "AQAAAAEAACcQAAAAEBkEbCfAudIyZ0Qz/bx2Nr8toMPAuQf3RoCrNDswSwn5Tdn0ZNdfy/51Se1MsshULQ==",
                    SecurityStamp = "SHNK3GMI3EAPFETOSCG36NR53ZYY3DN6",
                    ConcurrencyStamp = "d0c4d174-ab92-4b8a-b438-3801618fa132",
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = false,
                    AccessFailedCount = 0
                },
                new IdentityUser
                {
                    Id = "f6e4ac6a-d229-4e79-bb3d-1b58920918d7",
                    UserName = "gmail@bean.mr",
                    NormalizedUserName = "GMAIL@BEAN.MR",
                    NormalizedEmail = "GMAIL@BEAN.MR",
                    Email = "gmail@bean.mr",
                    EmailConfirmed = false,
                    PasswordHash = "AQAAAAEAACcQAAAAEBkEbCfAudIyZ0Qz/bx2Nr8toMPAuQf3RoCrNDswSwn5Tdn0ZNdfy/51Se1MsshULQ==",
                    SecurityStamp = "SHNK3GMI3EAPFETOSCG36NR53ZYY3DN6",
                    ConcurrencyStamp = "e0797c37-76cb-4814-b22e-de5344b5e2a0",
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = false,
                    AccessFailedCount = 0
                },
                new IdentityUser
                {
                    Id = "09ecbf1a-320a-4633-b749-1960d7cb2804",
                    UserName = "admin@library.com",
                    NormalizedUserName = "ADMIN@LIBRARY.COM",
                    Email = "admin@library.com",
                    NormalizedEmail = "ADMIN@LIBRARY.COM",
                    EmailConfirmed = false,
                    PasswordHash = "AQAAAAEAACcQAAAAEBkEbCfAudIyZ0Qz/bx2Nr8toMPAuQf3RoCrNDswSwn5Tdn0ZNdfy/51Se1MsshULQ==",
                    SecurityStamp = "SHNK3GMI3EAPFETOSCG36NR53ZYY3DN6",
                    ConcurrencyStamp = "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7",
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = false,
                    AccessFailedCount = 0
                }
                );

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                // connect admin user to admin role
                new IdentityUserRole<string> { UserId = "09ecbf1a-320a-4633-b749-1960d7cb2804", RoleId = "52df1f1d-74a2-46e2-a8f4-c8ac24a75ea7" }
                );
        
            modelBuilder.Entity<User>().HasData(
                new User { 
                    Id = 1,
                    AspNetUserId = "b8c10928-5609-4d7c-8051-f0500b49fa0b",
                    FullName = "Nathan Roberts", 
                    UserName = "Nathaniux123", 
                    Email = "nathan.roberts@gmail.com", 
                    OfficeId = 1, 
                    ProfilePictureUrl = "https://randomuser.me/api/portraits/men/94.jpg",
                    GoodReadsAccount= "https://www.goodreads.com/",
                    PhoneNumber="+3701234567",
                    Role="Full-Stack Developer",
                    IsAdmin=false
                }, new User
                {
                    Id = 2,
                    AspNetUserId = "f6e4ac6a-d229-4e79-bb3d-1b58920918d7",
                    FullName = "Mr. Bean",
                    UserName = "Beanz",
                    Email = "gmail@bean.mr",
                    OfficeId = 1,
                    ProfilePictureUrl = "https://vignette.wikia.nocookie.net/mrbean/images/4/4b/Mr_beans_holiday_ver2.jpg/revision/latest?cb=20181130033425",
                    GoodReadsAccount = "https://www.goodreads.com/",
                    PhoneNumber = "+3707654321",
                    Role = "Full-Time Disaster",
                    IsAdmin=false
                }, new User
                {
                    Id = 3,
                    FullName = "Jon Mills",
                    UserName = "MrAdmin",
                    Email = "admin@library.com",
                    OfficeId = 1,
                    ProfilePictureUrl = "https://randomuser.me/api/portraits/men/34.jpg",
                    GoodReadsAccount = "https://www.goodreads.com/admin-lib",
                    PhoneNumber = "+37010101010",
                    Role = "Full-Time Admin",
                    IsAdmin = true,
                    AspNetUserId = "09ecbf1a-320a-4633-b749-1960d7cb2804"
                }
                );

            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(e => e.Author).HasMaxLength(250);

                entity.Property(e => e.CoverPictureUrl)
                    .HasColumnName("CoverPictureURL")
                    .HasMaxLength(250);

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.GoodReadsUrl)
                    .HasColumnName("GoodReadsURL")
                    .HasMaxLength(250);

                entity.Property(e => e.Isbn)
                    .HasColumnName("ISBN")
                    .HasMaxLength(50);

                entity.Property(e => e.Tag).HasMaxLength(250);

                entity.Property(e => e.Title).HasMaxLength(250);
            });

            modelBuilder.Entity<Wish>().HasOne(e => e.Book).WithOne(a => a.Wish);

            modelBuilder.Entity<BookCase>(entity =>
            {
                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<BookCaseComment>(entity =>
            {
                entity.Property(e => e.Comment)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.BookCase)
                    .WithMany(p => p.BookCaseComment)
                    .HasForeignKey(d => d.BookCaseId)
                    .HasConstraintName("FK_BookCaseComments_BookCaseId");
            });

            modelBuilder.Entity<BookComment>(entity =>
            {
                entity.Property(e => e.Comment)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.BookComment)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BookComment_Book");
            });

            modelBuilder.Entity<BookWish>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Comment).HasMaxLength(500);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.BookWish)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BookWish_BookId");
            });

            modelBuilder.Entity<Library>(entity =>
            {
                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.Library)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Library_BookId");

                entity.HasOne(d => d.Office)
                    .WithMany(p => p.Library)
                    .HasForeignKey(d => d.OfficeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Library_OfficeId");
            });

            modelBuilder.Entity<LibraryComment>(entity =>
            {
                entity.Property(e => e.Comment)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.Library)
                    .WithMany(p => p.LibraryComment)
                    .HasForeignKey(d => d.LibraryId)
                    .HasConstraintName("FK_LibraryComment_LibraryId");
            });

            modelBuilder.Entity<Office>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(250);
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                //entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.CheckedInOn).HasColumnType("datetime");

                entity.Property(e => e.CheckedOutOn).HasColumnType("datetime");

                entity.Property(e => e.PlannedReturnOn).HasColumnType("datetime");

                entity.HasOne(d => d.BookCase)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.BookCaseId)
                    .HasConstraintName("FK_Reservation_BookCaseId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Reservation_UserId");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.ProfilePictureUrl).HasMaxLength(300);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.HasOne(d => d.Office)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.OfficeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_OfficeId");
            });

            modelBuilder.Entity<Waiting>(entity =>
            {
                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.BookCase)
                    .WithMany(p => p.Waiting)
                    .HasForeignKey(d => d.BookCaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Waiting_BookCaseId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Waiting)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Waiting_UserId");
            });

            modelBuilder.Entity<Wish>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                //entity.HasOne(d => d.Book)
                //    .WithOne(p => p.Wish)
                //    .HasForeignKey<Wish>(d => d.Id)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK_Wish_Id");
            });
            modelBuilder.Entity<UserWish>(entity =>
            {
                entity.HasOne(d => d.Wish)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.WishId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserWish_WishId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserWish)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserWish_UserId");
            });
            OnModelCreatingPartial(modelBuilder);

            modelBuilder.Entity<IdentityUser>().Property(p => p.Id).ValueGeneratedOnAdd();
            base.OnModelCreating(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
