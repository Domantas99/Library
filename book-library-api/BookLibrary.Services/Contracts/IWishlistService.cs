using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Wishlist;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface IWishlistService
    {
        Task<ResponseResult<ICollection<WishlistItemDTO>>> GetWishlist(List<string> categories, List<string> authors, string sort, string aspNetUserId);
        void ManageVote(int id);
        Task<ResponseResult<ICollection<VoteItemDTO>>> GetVote(int userId);
        Task<ResponseResult<Wish>> AddNewWish(Wish wish);
        Task<ResponseResult<Book>> MoveWishToLibrary(Book book);
        Task<ResponseResult<ICollection<string>>> GetCategories();
        Task<ResponseResult<ICollection<string>>> GetAuthors();
    }
}
