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
        [HttpPut("{id}")]
        public async Task<ActionResult<ResponseResult<Book>>> UpdateBook(int id, [FromBody] Book book)
        {
            return await _booksService.UpdateBook(id, book);
        }
        [HttpGet]
        public async Task<ActionResult<ResponseResult<ICollection<Book>>>> GetBooksByCategory([FromQuery]string category)
        {
            return await _booksService.GetBooks(category);
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

        [HttpGet("{id}/availability")]
        public async Task<ActionResult<ResponseResult<ICollection<Library>>>> GetBookAvailability(int id)
        {
            return await _booksService.GetBookAvailability(id);
        }

        [HttpGet("{id}/comments")]
        public async Task<ActionResult<ResponseResult<ICollection<BookComment>>>> GetComments(int id)
        {
            return await _booksService.GetComments(id);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseResult<Book>>> DeleteBook(int id) {
            return await _booksService.DeleteBook(id);
        }
    }
}