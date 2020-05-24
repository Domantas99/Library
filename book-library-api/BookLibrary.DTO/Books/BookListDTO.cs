using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Books
{
    public class BookListDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Isbn { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Tag { get; set; }
        public string Format { get; set; }
        public int? NumberOfPages { get; set; }
        public string Series { get; set; }
        public string Publisher { get; set; }
        public string EditionLanguage { get; set; }
        public string CoverPictureUrl { get; set; }
        public string GoodReadsUrl { get; set; }
        public bool IsArchived { get; set; } = false;
        public DateTime DateAdded { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool IsAvailableInMyOffice { get; set; }
        public decimal Rating { get; set; }
    }
}
