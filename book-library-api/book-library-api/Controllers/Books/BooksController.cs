﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Books;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
<<<<<<< HEAD
using BookLibrary.Services.ExceptionHandling.Exceptions;
=======
using Microsoft.AspNetCore.Authorization;
>>>>>>> fba72cc67bebe2f1b87cf65276c4b423d7bc0c24
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Api.Controllers.Books
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ApiControllerBase
    {
        private readonly IBooksService _booksService;
        public BooksController(IBooksService booksService) {
            _booksService = booksService;
        }

        [HttpPost]
        public async Task<ActionResult<ResponseResult<Book>>> AddBook([FromBody] AddBookDTO book) {
            return await _booksService.AddNewBook(book);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> UpdateBook(int id, [FromBody] Book book)
        {
            return await _booksService.UpdateBook(id, book);
        }
        [HttpGet]
        public async Task<ActionResult<ResponseResult<ICollection<BookListDTO>>>> GetBooks([FromQuery] int userOffice, [FromQuery]List<string> category, [FromQuery]List<string> offices, [FromQuery] string status, [FromQuery] List<string> authors, [FromQuery] string sort)
        {
            throw new HandledException("exeption in books");
            return await _booksService.GetBooks(category, offices, status, authors, userOffice, sort);
        }

        [HttpGet("recommended")]
        public async Task<ActionResult<ResponseResult<ICollection<BookListDTO>>>> GetRecommendedBooks([FromQuery] int userId, [FromQuery]int count) 
        {
            return await _booksService.GetUserRecommendedBooks(userId, count);
        }

        [HttpGet("filter/{pattern}")]
        public async Task<ActionResult<ResponseResult<ICollection<Book>>>> GetFilteredBooks(string pattern)
        {
            return await _booksService.GetFilteredBooks(pattern);
        }

        [HttpGet("book-details")]
        public async Task<ActionResult<ResponseResult<BookDetailsDTO>>> GetBook([FromQuery] int bookId, [FromQuery] int userId)
        {
            return await _booksService.GetBook(bookId, userId);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<ResponseResult<ICollection<string>>>> GetCategories()
        {
            throw new Exception("exeption in books");
            return await _booksService.GetCategories();
        }

        [HttpGet("authors")]
        public async Task<ActionResult<ResponseResult<ICollection<string>>>> GetAuthors()
        {
            return await _booksService.GetAuthors();
        }

        [HttpGet("latest/{count}")]
        public async Task<ActionResult<ResponseResult<ICollection<BookListDTO>>>> GetLatestBooks(int count, [FromQuery] int userOffice)
        {
            return await _booksService.GetLatestBooks(count, userOffice);
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

        [HttpPost("archive-book")]
        public async Task<ActionResult<ResponseResult<Book>>> SetBookArchiveState([FromQuery]int bookId, [FromQuery]bool status)
        {
            return await _booksService.SetBookArchiveStatus(bookId, status);
        }

    }
}