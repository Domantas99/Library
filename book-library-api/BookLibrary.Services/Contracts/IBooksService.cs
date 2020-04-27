using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface IBooksService
    {
        Task<ResponseResult<Book>> AddNewBook(Book book);
        Task<ResponseResult<ICollection<Book>>> GetBooks();
        Task<ResponseResult<ICollection<Book>>> GetFilteredBooks(string pattern);
        Task<ResponseResult<Book>> GetBook(int id);
        Task<ResponseResult<ICollection<string>>> GetCategories();
        Task<ResponseResult<ICollection<Book>>> GetLatestBooks(int count);
        Task<ResponseResult<ICollection<Library>>> GetBookAvailability(int bookId);
        Task<ResponseResult<ICollection<BookComment>>> GetComments(int bookId);
        Task<ResponseResult<Book>> DeleteBook(int id);
    }
}
