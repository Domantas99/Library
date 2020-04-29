using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Wishlist;
using BookLibrary.Services.Contracts;
using Microsoft.EntityFrameworkCore;
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

        public async Task<ResponseResult<Wish>> AddNewWish(Wish wish)
        {
            bool flag = false;
            try
            {
                _context.Wish.Add(wish);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                flag = true;
            }
            return new ResponseResult<Wish> { Error = flag, ReturnResult = wish };
        }

        public async Task<ResponseResult<ICollection<WishlistItemDTO>>> GetWishlist()
        {
            var wishlist = await _context.Wish.Select(x => new WishlistItemDTO() {
                Id = x.Book.Id,
                Title = x.Book.Title,
                Author = x.Book.Author,
                CoverPictureUrl = x.Book.CoverPictureUrl,
                DateAdded = x.Book.DateAdded,
                ReleaseDate = x.Book.ReleaseDate,
                Votes = x.Votes.Users.Count
            }).ToListAsync();

            return new ResponseResult<ICollection<WishlistItemDTO>> { Error = false, ReturnResult = wishlist };
        }
    }
}
