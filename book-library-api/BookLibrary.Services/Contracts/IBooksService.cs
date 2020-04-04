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
        Task<ResponseResult<ICollection<Book>>> GetFilteredBooks(string pattern);
        Task<ResponseResult<Book>> GetBook(int id);
    }
}
