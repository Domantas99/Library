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
                var library = book.Library;
                book.Library = null;
                _context.Book.Add(book);
                await _context.SaveChangesAsync();
                foreach (var lib in library) {
                    if (lib.Count > 0)
                    {
                        lib.BookId = book.Id;
                        lib.ModifiedOn = null;
                        lib.CreatedOn = DateTime.Today;
                        _context.Library.Add(lib);
                    }
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) {
                errorFlag = true;
            }

            return new ResponseResult<Book> { Error = errorFlag, ReturnResult = book };
        }

        public async Task<ResponseResult<Wish>> AddNewWish(Wish wish)
        {
            bool flag = false;
            try
            {
                _context.Wish.Add(wish);
                await _context.SaveChangesAsync();
            }
            catch(Exception e)
            {
                flag = true;
            }
            return new ResponseResult<Wish> { Error = flag, ReturnResult = wish };
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

        public async Task<ResponseResult<ICollection<Library>>> GetBookAvailability(int bookId)
        {
            var libraries = _context.Library.Include(lib => lib.Office).Where(lib => lib.BookId == bookId).ToList();

            return new ResponseResult<ICollection<Library>> { Error = false, ReturnResult = libraries };
        }

        public async Task<ResponseResult<ICollection<Book>>> GetBooks()
        {
            var books = BooksWithoutWishes();
            return new ResponseResult<ICollection<Book>> { Error = false, ReturnResult = books };
        }

        public async Task<ResponseResult<ICollection<string>>> GetCategories()
        {
            var books = BooksWithoutWishes();
            var uniqueCategories = books.Select(book => book.Category).Distinct().ToList();

            return new ResponseResult<ICollection<string>> { Error = false, ReturnResult = uniqueCategories };
        }

        public async Task<ResponseResult<ICollection<Book>>> GetFilteredBooks(string pattern)
        {
            pattern = pattern.ToLower();
            var filteredBooks = _context.Book.Where(book => book.Title.ToLower().Contains(pattern) ||
                                                            book.Author.ToLower().Contains(pattern) ||
                                                            book.Isbn.ToLower().Contains(pattern))
                                                            .ToList();

            return new ResponseResult<ICollection<Book>> { Error = false, ReturnResult = filteredBooks };

        }

        public async Task<ResponseResult<ICollection<Book>>> GetLatestBooks(int count)
        {
            var books = BooksWithoutWishes();

            books.Sort((a, b) => DateTime.Compare(b.DateAdded, a.DateAdded));

            return new ResponseResult<ICollection<Book>> { Error = false, ReturnResult = books.Take(count).ToList() };
        }

        private List<Book> BooksWithoutWishes() {
            var books = _context.Book.ToList();
            var wishes = _context.Wish.Include(w => w.Book).ToList();
            for (int i = 0; i < wishes.Count; i++)
            {
                books.Remove(wishes[i].Book);
            }
            return books;
        }
    }
}
