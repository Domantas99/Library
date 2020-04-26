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
        Task<ResponseResult<ICollection<WishlistItemDTO>>> GetWishlist();
        Task<ResponseResult<Wish>> AddNewWish(Wish wish);
    }
}
