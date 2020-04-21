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
        [HttpGet]
        public async Task<ActionResult<ResponseResult<ICollection<Book>>>> GetBooks()
        {
            return await _booksService.GetBooks();
        }

        [HttpGet("filter/{pattern}")]
        public async Task<ActionResult<ResponseResult<ICollection<Book>>>> GetFilteredBooks(string pattern)
        {
            return await _booksService.GetFilteredBooks(pattern);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseResult<Book>>> GetBook(int id)
        {
            return await _booksService.GetBook(id);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<ResponseResult<ICollection<string>>>> GetCategories()
        {
            return await _booksService.GetCategories();
        }

        [HttpGet("latest/{count}")]
        public async Task<ActionResult<ResponseResult<ICollection<Book>>>> GetLatestBooks(int count)
        {
            return await _booksService.GetLatestBooks(count);
        }
    }
}