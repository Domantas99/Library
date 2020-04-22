using Microsoft.EntityFrameworkCore;

namespace BookLibrary.DataBase.Models
{
    public partial class LibraryDBContext : DbContext
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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
         
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Office>().HasData(
                new Office { Id = 1, Name="Kaunas" },
                new Office { Id = 2, Name = "Vilnius" },
                new Office { Id = 3, Name = "London" },
                new Office { Id = 4, Name = "Toronto" },
                new Office { Id = 5, Name = "Chicago" }
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
                entity.Property(e => e.Id).ValueGeneratedNever();

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
                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.GoodReadsAccount).HasMaxLength(250);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(250);

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

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.Waiting)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Waiting_BookId");

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

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Wish)
                    .HasForeignKey<Wish>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Wish_Id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
