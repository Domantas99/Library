using BookLibrary.DataBase.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Wishlist
{
    public class WishlistItemDTO
    {
        public int WishId { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string CoverPictureUrl { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int Votes { get; set; }
        public bool UserVoted { get; set; }

        public static explicit operator WishlistItemDTO(Wish wish) => new WishlistItemDTO {
            WishId = wish.Id,
            Id = wish.Book.Id,
            Title = wish.Book.Title,
            Author = wish.Book.Author,
            CoverPictureUrl = wish.Book.CoverPictureUrl,
            DateAdded = wish.Book.DateAdded,
            ReleaseDate = wish.Book.ReleaseDate,
            Votes = wish.Votes.Count
        };
    }
}
