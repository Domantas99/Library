using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Books;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using BookLibrary.Services.ExceptionHandling.Exceptions;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<Book>> AddBook([FromBody] AddBookDTO book) {
            return await _booksService.AddNewBook(book);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> UpdateBook(int id, [FromBody] Book book)
        {
            return await _booksService.UpdateBook(id, book);
        }
        [HttpGet]
        public async Task<ActionResult<ICollection<BookListDTO>>> GetBooks([FromQuery] int userOffice, [FromQuery]List<string> category, [FromQuery]List<string> offices, [FromQuery] string status, [FromQuery] List<string> authors, [FromQuery] string sort)
        {
            return await _booksService.GetBooks(category, offices, status, authors, userOffice, sort);
        }


        [HttpGet("recommended")]
        public async Task<ActionResult<ICollection<BookListDTO>>> GetRecommendedBooks([FromQuery] int userId, [FromQuery]int count) 
        {
            return await _booksService.GetUserRecommendedBooks(userId, count);
        }

        [HttpGet("filter/{pattern}")]
        public async Task<ActionResult<ICollection<Book>>> GetFilteredBooks(string pattern)
        {
            return await _booksService.GetFilteredBooks(pattern);
        }

        [HttpGet("book-details")]
        public async Task<ActionResult<BookDetailsDTO>> GetBook([FromQuery] int bookId, [FromQuery] int userId)
        {
            return await _booksService.GetBook(bookId, userId);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<ICollection<string>>> GetCategories()
        {
            return await _booksService.GetCategories();
        }

        [HttpGet("authors")]
        public async Task<ActionResult<ICollection<string>>> GetAuthors()
        {
            return await _booksService.GetAuthors();
        }

        [HttpGet("latest/{count}")]
        public async Task<ActionResult<ICollection<BookListDTO>>> GetLatestBooks(int count, [FromQuery] int userOffice)
        {
            return await _booksService.GetLatestBooks(count, userOffice);
        }

        [HttpGet("{id}/availability")]
        public async Task<ActionResult<ICollection<Library>>> GetBookAvailability(int id)
        {
            return await _booksService.GetBookAvailability(id);
        }

        [HttpGet("{id}/comments")]
        public async Task<ActionResult<ICollection<BookComment>>> GetComments(int id)
        {
            return await _booksService.GetComments(id);
        }

        [HttpGet("{id}/reservations")]
        public async Task<ActionResult<ICollection<ReservationDTO>>> getReservations(int id) {
            return await _booksService.GetReservations(id);
        }

        [HttpPost("{id}/rate")]
        public async Task<decimal> RateBook(int id, int rating) {
            return await _booksService.RateBook(id, rating);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> DeleteBook(int id) {
            return await _booksService.DeleteBook(id);
        }

        [HttpPost("archive-book")]
        public async Task<ActionResult<Book>> SetBookArchiveState([FromQuery]int bookId, [FromQuery]bool status)
        {
            return await _booksService.SetBookArchiveStatus(bookId, status);
        }

    }
}