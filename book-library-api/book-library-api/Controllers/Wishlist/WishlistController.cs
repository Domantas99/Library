﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class WishlistController : ApiControllerBase
    {
        private IWishlistService _wishlistService;

        public WishlistController(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }
        [HttpGet]
        public async Task<ActionResult<ICollection<WishlistItemDTO>>> GetWishlist([FromQuery]List<string> category, [FromQuery] List<string> authors, [FromQuery] string sort)
        {
            return await _wishlistService.GetWishlist(category, authors, sort, GetUserId());
        }
        [HttpPost("vote/{id}")]
        public ActionResult ManageVote(int id)
        {
            _wishlistService.ManageVote(id, GetUserId());
            return Ok();
        }

        [HttpPost("add")]
        public async Task<ActionResult<Wish>> AddNewWish([FromBody]Wish wish)
        {
            return await _wishlistService.AddNewWish(wish);
        }

        [HttpPost("move-to-library")]
        public async Task<ActionResult<Book>> MoveWishToLibrary([FromBody]Book book)
        {
            return await _wishlistService.MoveWishToLibrary(book);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<ICollection<string>>> GetCategories()
        {
            return await _wishlistService.GetCategories();
        }

        [HttpGet("authors")]
        public async Task<ActionResult<ICollection<string>>> GetAuthors()
        {
            return await _wishlistService.GetAuthors();
        }

    }
}