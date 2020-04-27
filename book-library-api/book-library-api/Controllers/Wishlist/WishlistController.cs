using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Wishlist;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Api.Controllers.Wishlist
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private IWishlistService _wishlistService;

        public WishlistController(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }
        [HttpGet]
        public async Task<ActionResult<ResponseResult<ICollection<WishlistItemDTO>>>> GetWishlist()
        {
            return await _wishlistService.GetWishlist();
        }

        [HttpPost("add")]
        public async Task<ActionResult<ResponseResult<Wish>>> AddNewWish([FromBody]Wish wish)
        {
            return await _wishlistService.AddNewWish(wish);
        }
    }
}