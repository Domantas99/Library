using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Api.Controllers.Books
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBooksService _booksService;
        public BooksController(IBooksService booksService) {
            _booksService = booksService;
        }

        [HttpPost]
        public async Task<ActionResult<ResponseResult<Book>>> AddBook([FromBody] Book book) {
            return await _booksService.AddNewBook(book);
        }

        [HttpGet("filter/{pattern}")]
        public async Task<ActionResult<ResponseResult<ICollection<Book>>>> GetFilteredBooks(string pattern)
        {
            return await _booksService.GetFilteredBooks(pattern);
        }
    }
}