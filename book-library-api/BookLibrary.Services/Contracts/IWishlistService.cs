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
        Task<List<VoteItemDTO>> GetVote(int userId);
        Task<Wish> AddNewWish(Wish wish);
        Task<Book> MoveWishToLibrary(Book book);
        Task<List<string>> GetCategories();
        Task<List<string>> GetAuthors();
        Task<List<WishlistItemDTO>> GetWishlist(List<string> categories, List<string> authors, string sort, string aspNetUserId);
        void ManageVote(int id);
    }
}
