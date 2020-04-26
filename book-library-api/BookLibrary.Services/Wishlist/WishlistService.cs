using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Wishlist;
using BookLibrary.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Wishlist
{
    public class WishlistService : IWishlistService
    {
        private readonly LibraryDBContext _context;
        public WishlistService(LibraryDBContext context)
        {
            _context = context;
        }
        public async Task<ResponseResult<ICollection<WishlistItemDTO>>> GetWishlist()
        {
            var wishlist = _context.Wish.Select(x => new WishlistItemDTO() {
                Id = x.Book.Id,
                Title = x.Book.Title,
                Author = x.Book.Author,
                CoverPictureUrl = x.Book.CoverPictureUrl,
                DateAdded = x.Book.DateAdded,
                ReleaseDate = x.Book.ReleaseDate,
                Votes = x.Votes.Users.Count
            }).ToList();

            return new ResponseResult<ICollection<WishlistItemDTO>> { Error = false, ReturnResult = wishlist };
        }
    }
}
