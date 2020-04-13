using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookLibrary.DataBase.Models
{
    public partial class Book
    {
        public Book()
        {
            BookComment = new HashSet<BookComment>();
            BookWish = new HashSet<BookWish>();
            Library = new HashSet<Library>();
            Waiting = new HashSet<Waiting>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Isbn { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Tag { get; set; }
        public string Format { get; set; }
        public int NumberOfPages { get; set; }
        public string Series { get; set; }
        public string Publisher { get; set; }
        public string EditionLanguage { get; set; }
        public string CoverPictureUrl { get; set; }
        public string GoodReadsUrl { get; set; }
        [Column(TypeName ="Date")]
        public DateTime DateAdded { get; set; }
        [Column(TypeName = "Date")]
        public DateTime ReleaseDate { get; set; }
        public virtual Wish Wish { get; set; }
        public virtual ICollection<BookComment> BookComment { get; set; }
        public virtual ICollection<BookWish> BookWish { get; set; }
        public virtual ICollection<Library> Library { get; set; }
        public virtual ICollection<Waiting> Waiting { get; set; }
    }
}
