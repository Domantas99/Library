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
        public async Task<ActionResult<ResponseResult<ICollection<WishlistItemDTO>>>> GetWishlist([FromQuery]List<string> category, [FromQuery] List<string> authors, [FromQuery] string sortField, [FromQuery] int sortDirection)
        {
            return await _wishlistService.GetWishlist(category, authors, sortField, sortDirection);
        }
        [HttpGet("vote")]
        public async Task<ActionResult<ResponseResult<ICollection<VoteItemDTO>>>> GetVote([FromQuery] int userId)
        {
            return await _wishlistService.GetVote(userId);
        }
        [HttpPost("vote")]
        public async Task<ActionResult<ResponseResult<UserWish>>> ManageVote([FromBody] UserWish userWish)
        {
            return await _wishlistService.ManageVote(userWish);
        }

        [HttpPost("add")]
        public async Task<ActionResult<ResponseResult<Wish>>> AddNewWish([FromBody]Wish wish)
        {
            return await _wishlistService.AddNewWish(wish);
        }

        [HttpPost("move-to-library")]
        public async Task<ActionResult<ResponseResult<Book>>> MoveWishToLibrary([FromBody]Book book)
        {
            return await _wishlistService.MoveWishToLibrary(book);
        }

    }
}