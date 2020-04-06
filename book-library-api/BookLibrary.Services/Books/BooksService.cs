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
            try
            {
                _context.Book.Add(book);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) {
                errorFlag = true;
            }

            return new ResponseResult<Book> { Error = errorFlag, ReturnResult = book };
        }

        public async Task<ResponseResult<Book>> GetBook(int id)
        {
            bool errFlag = false;
            var book = await _context.Book.FirstOrDefaultAsync(b => b.Id == id);
            if (book != null)
            {
                errFlag = true;
            }

            return new ResponseResult<Book> { Error = errFlag, ReturnResult = book };
        }

        public async Task<ResponseResult<ICollection<Book>>> GetFilteredBooks(string pattern)
        {
            pattern = pattern.ToLower();
            var filteredBooks = _context.Book.Where(book => book.Title.ToLower().Contains(pattern) ||
                                                            book.Author.ToLower().Contains(pattern) ||
                                                            book.Isbn.ToLower().Contains(pattern))
                                                            .ToList();

            return new ResponseResult<ICollection<Book>> { Error = false , ReturnResult = filteredBooks };
        }
    }
}
