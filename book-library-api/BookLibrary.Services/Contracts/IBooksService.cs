using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Books;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface IBooksService
    {
        Task<Book> AddNewBook(AddBookDTO book);
        Task<List<BookListDTO>> GetBooks(List<string> categories, List<string> offices, string status, List<string> authors, int userOffice, string sort);
        Task<Book> UpdateBook(int id, Book book);
        Task<List<Book>> GetFilteredBooks(string pattern);
        Task<BookDetailsDTO> GetBook(int bookId, int userId);
        Task<List<string>> GetCategories();
        Task<List<BookListDTO>> GetLatestBooks(int count, int userOffice);
        Task<List<Library>> GetBookAvailability(int bookId);
        Task<List<BookComment>> GetComments(int bookId);
        Task<Book> DeleteBook(int id);
        Task<List<string>> GetAuthors();
        Task<List<BookListDTO>> GetUserRecommendedBooks(int userId, int count);
        Task<Book> SetBookArchiveStatus(int bookId, bool isArchived);
        Task<List<ReservationDTO>> GetReservations(int id);
        Task<decimal> RateBook(int id, int rating);
    }
}
