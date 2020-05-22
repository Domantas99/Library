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
        Task<ICollection<WishlistItemDTO>> GetWishlist(List<string> categories, List<string> authors, string sort);
        Task<UserWish> ManageVote(UserWish userWish);
        Task<ICollection<VoteItemDTO>> GetVote(int userId);
        Task<Wish> AddNewWish(Wish wish);
        Task<Book> MoveWishToLibrary(Book book);
        Task<ICollection<string>> GetCategories();
        Task<ICollection<string>> GetAuthors();
    }
}
