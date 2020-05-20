using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Books;
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
        Task<ResponseResult<Book>> AddNewBook(AddBookDTO book);
        Task<ResponseResult<ICollection<BookListDTO>>> GetBooks(List<string> categories, List<string> offices, string status, List<string> authors, int userOffice, string sort);
        Task<ResponseResult<Book>> UpdateBook(int id, Book book);
        Task<ResponseResult<ICollection<Book>>> GetFilteredBooks(string pattern);
        Task<ResponseResult<BookDetailsDTO>> GetBook(int bookId, int userId);
        Task<ResponseResult<ICollection<string>>> GetCategories();
        Task<ResponseResult<ICollection<Book>>> GetLatestBooks(int count);
        Task<ResponseResult<ICollection<Library>>> GetBookAvailability(int bookId);
        Task<ResponseResult<ICollection<BookComment>>> GetComments(int bookId);
        Task<ResponseResult<Book>> DeleteBook(int id);
        Task<ResponseResult<ICollection<string>>> GetAuthors();
        Task<ResponseResult<ICollection<Book>>> GetUserRecommendedBooks(int userId, int count);
        Task<ResponseResult<Book>> SetBookArchiveStatus(int bookId, bool isArchived);
    }
}
