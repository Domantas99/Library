using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Books
{
    public class BooksService : IBooksService
    {
        private readonly LibraryDBContext _context;
        public BooksService(LibraryDBContext context) {
            _context = context;
        }

        public async Task<ResponseResult<Book>> AddNewBook(Book book)
        {
            bool errorFlag = false;
            string message;
            try
            {
                _context.Book.Add(book);
                await _context.SaveChangesAsync();
                message = "Book was added successfully";
            }
            catch (Exception ex) {
                message = ex.Message;
                errorFlag = true;
            }

            return new ResponseResult<Book> { Error = errorFlag, Message = message, ReturnResult = book };
        }
    }
}
