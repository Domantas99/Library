using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace BookLibrary.DataBase.Models
{
    [DataContract]
    public partial class Book
    {
        public Book()
        {
            BookComment = new HashSet<BookComment>();
            BookWish = new HashSet<BookWish>();
            Library = new HashSet<Library>();
        }

        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string Isbn { get; set; }
        [DataMember]
        public string Author { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string Category { get; set; }
        [DataMember]
        public string Tag { get; set; }
        [DataMember]
        public string Format { get; set; }
        [DataMember]
        public int? NumberOfPages { get; set; }
        [DataMember]
        public string Series { get; set; }
        [DataMember]
        public string Publisher { get; set; }
        [DataMember]
        public string EditionLanguage { get; set; }
        [DataMember]
        public string CoverPictureUrl { get; set; }
        [DataMember]
        public string GoodReadsUrl { get; set; }
        [DataMember]
        [Column(TypeName ="Date")]
        public DateTime DateAdded { get; set; }
        [DataMember]
        [Column(TypeName = "Date")]
        public DateTime ReleaseDate { get; set; }
        public virtual Wish Wish { get; set; }
        public virtual ICollection<BookComment> BookComment { get; set; }
        public virtual ICollection<BookWish> BookWish { get; set; }
        [DataMember]
        public virtual ICollection<Library> Library { get; set; }
    }
}
