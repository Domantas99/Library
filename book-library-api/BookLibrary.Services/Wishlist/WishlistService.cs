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
                WishId = x.Id,
                Id = x.Book.Id,
                Title = x.Book.Title,
                Author = x.Book.Author,
                CoverPictureUrl = x.Book.CoverPictureUrl,
                DateAdded = x.Book.DateAdded,
                ReleaseDate = x.Book.ReleaseDate,
                Votes = x.Votes.Count
            }).ToList();

            return new ResponseResult<ICollection<WishlistItemDTO>> { Error = false, ReturnResult = wishlist };
        }
        public async Task<ResponseResult<UserWish>> ManageVote(UserWish userWish)
        {
            bool flag = false;
            var alreadyExists = _context.UserWish.FirstOrDefault(x => x.WishId == userWish.WishId && x.UserId == userWish.UserId);
            try
            {
                if (alreadyExists != null)
                {
                    _context.UserWish.Remove(alreadyExists);
                }
                else
                    _context.UserWish.Add(userWish);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                flag = true;
            }

            return new ResponseResult<UserWish> { Error = flag, ReturnResult = userWish };
        }
        public async Task<ResponseResult<ICollection<VoteItemDTO>>> GetVote(int userId)
        {
            var voteList = _context.UserWish.Select(x => new VoteItemDTO()
            {
                WishId = x.WishId,
                Vote = x.UserId == userId
            }).ToList();
            
            return new ResponseResult<ICollection<VoteItemDTO>> { Error = false, ReturnResult = voteList };
        }
    }
}
