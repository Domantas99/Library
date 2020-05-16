using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Books;
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
        private readonly IReservationsService _reservationsService;
        public BooksService(LibraryDBContext context, IReservationsService reservationsService) {
            _context = context;
            _reservationsService = reservationsService;
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

        public async Task<ResponseResult<Book>> DeleteBook(int id)
        {
            var bookToDelete = _context.Book.FirstOrDefault(b => b.Id == id);
            if (bookToDelete!=null)
            {
                var libraryToRemove = _context.Library.Where(b => b.BookId == id);
                var wishToRemove = _context.Wish.Where(b => b.BookId == id);
                _context.Library.RemoveRange(libraryToRemove);
                _context.RemoveRange(wishToRemove);
                _context.Book.Remove(bookToDelete);
                await _context.SaveChangesAsync();
            }
            return new ResponseResult<Book> { Error = false, ReturnResult = bookToDelete };
        }

        public async Task<ResponseResult<BookDetailsDTO>> GetBook(int bookId, int userId)
        {
            var book = await _context.Book.Include(x => x.Library).FirstOrDefaultAsync(b => b.Id == bookId);
            var userReservations = _reservationsService.GetReservations(userId).Result.ReturnResult;
            var reservation = userReservations.FirstOrDefault(x => x.Book.Id == bookId);
            bool isCurrentlyReading = false;

            if (reservation != null)
            {
                isCurrentlyReading = true;
            }
            var bookDetailsDTO = new BookDetailsDTO { Book = book, IsUserCurrentlyReading = isCurrentlyReading, ReadingUserId = userId, ActiveReservation= reservation };

            return new ResponseResult<BookDetailsDTO> { Error = false, ReturnResult = bookDetailsDTO };
        }

        public async Task<ResponseResult<ICollection<Library>>> GetBookAvailability(int bookId)
        {
            var libraries = await _context.Library.Include(lib => lib.Office).Where(lib => lib.BookId == bookId).ToListAsync();
            var bookCases = await _context.BookCase.Where(x => x.BookId == bookId).ToListAsync();
            for (int i = 0; i < bookCases.Count; i++)
            {
                int index = libraries.FindIndex(a => a.BookId == bookCases[i].BookId && a.OfficeId == bookCases[i].OfficeId);
                if (index >= 0)
                {
                    libraries[index].Count -= bookCases[i].Count;
                }
            }

            var a = libraries;
            return new ResponseResult<ICollection<Library>> { Error = false, ReturnResult = libraries };
        }

        public Task<ResponseResult<ICollection<Book>>> GetBooks(List<string> categories, List<string> offices, string status, List<string> authors, string sortField="DateAdded", int sortDirection=-1)
        {
            var books = BooksWithoutWishes();
            if (categories != null && categories.Count > 0)
            {
                books = books.Where(a => a.Category != null && categories.Contains(a.Category)).ToList();
            }
            if (authors.Count > 0) {
                books = books.Where(a => authors.Contains(a.Author)).ToList();
            }
            if (offices.Count > 0) {
                var booksInOffices = _context.Library.Where(a => offices.Contains(a.Office.Name)).Select(a => a.Book.Id).Distinct();
                books = books.Where(a => booksInOffices.Contains(a.Id)).ToList();
            }
            if (!(status == null)) {
                if (status.ToLower() == "available")
                {
                    books = books.Where(a => GetBookAvailability(a.Id).Result.ReturnResult.Count > 0).ToList();
                } else if (status.ToLower() == "unavailable")
                {
                    books = books.Where(a => GetBookAvailability(a.Id).Result.ReturnResult.Count == 0).ToList();
                }
            }
            try
            {
                if (sortDirection > 0)
                {
                    books = books.OrderBy(s => s.GetType().GetProperty(sortField).GetValue(s)).ToList();
                }
                else if (sortDirection < 0)
                {
                    books = books.OrderByDescending(s => s.GetType().GetProperty(sortField).GetValue(s)).ToList();
                }
            }
            catch (NullReferenceException e) {
                //Probably means sort field isn't set properly. Note it's case sensitive.
            }
            return Task.FromResult(new ResponseResult<ICollection<Book>> { Error = false, ReturnResult = books });
        }

        public Task<ResponseResult<ICollection<string>>> GetCategories()
        {
            var books = BooksWithoutWishes();
            var uniqueCategories = books.Where(book => book.Category != null).Select(book => book.Category).Distinct(StringComparer.CurrentCultureIgnoreCase).ToList();
            uniqueCategories.Sort();
            return Task.FromResult(new ResponseResult<ICollection<string>> { Error = false, ReturnResult = uniqueCategories });
        }

        public Task<ResponseResult<ICollection<string>>> GetAuthors()
        {
            var books = BooksWithoutWishes();
            var uniqueAuthors = books.Select(book => book.Author).Distinct(StringComparer.CurrentCultureIgnoreCase).ToList();
            uniqueAuthors.Sort();
            return Task.FromResult(new ResponseResult<ICollection<string>> { Error = false, ReturnResult = uniqueAuthors });
        }

        public Task<ResponseResult<ICollection<BookComment>>> GetComments(int bookId)
        {
            var comments = _context.BookComment.Where(comment => comment.BookId == bookId).ToList();
            return Task.FromResult(new ResponseResult<ICollection<BookComment>> { Error = false, ReturnResult = comments });
        }

        public Task<ResponseResult<ICollection<Book>>> GetFilteredBooks(string pattern)
        {
            pattern = pattern.ToLower();
            var books = BooksWithoutWishes();
            var filteredBooks =  books.Where(book => book.Title.ToLower().Contains(pattern) ||
                                                            book.Author.ToLower().Contains(pattern) ||
                                                            book.Isbn.ToLower().Contains(pattern))
                                                            .ToList();

            return Task.FromResult(new ResponseResult<ICollection<Book>> { Error = false, ReturnResult = filteredBooks });

        }

        public Task<ResponseResult<ICollection<Book>>> GetLatestBooks(int count)
        {
            var books = BooksWithoutWishes();

            books.Sort((a, b) => DateTime.Compare(b.DateAdded, a.DateAdded));

            return Task.FromResult(new ResponseResult<ICollection<Book>> { Error = false, ReturnResult = books.Take(count).ToList() });
        }

        public async Task<ResponseResult<Book>> UpdateBook(int id, Book book)
        {
            bool errorFlag = false;
            try
            {
                book.Id = id;
                var library = book.Library;
                book.Library = null;
                _context.Book.Update(book);
                await _context.SaveChangesAsync();
                foreach (var lib in library)
                {
                    if (lib.Count > 0)
                    {
                        var oldLib = _context.Library.Where(x => x.BookId == id && x.OfficeId == lib.OfficeId).FirstOrDefault();
                        if (oldLib != null)
                        {
                            oldLib.ModifiedOn = DateTime.Today;
                            oldLib.Count = lib.Count;
                        }
                        else {
                            lib.BookId = id;
                            lib.ModifiedOn = null;
                            lib.CreatedOn = DateTime.Today;
                            _context.Library.Add(lib);
                        }
                    }
                    else {
                        var oldLib = _context.Library.Where(x => x.BookId == id && x.OfficeId == lib.OfficeId).FirstOrDefault();
                        if (oldLib != null)
                        {
                            _context.Library.Remove(oldLib);
                        }
                    }
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                errorFlag = true;
            }

            return new ResponseResult<Book> { Error = errorFlag, ReturnResult = book };
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

        public async Task<ResponseResult<ICollection<Book>>> GetUserRecommendedBooks(int userId, int count)
        {
            var allBooks = _context.Book.ToList();

            var reservations = _context.Reservation.Where(x => x.UserId == userId).Select(x => x.BookCase.Book).Distinct().ToList();
            allBooks = allBooks.Except(reservations).ToList();

            var userCategories = reservations.Select(x => x.Category).Distinct().ToList();
            var userAuthors = reservations.Select(x => x.Author).Distinct().ToList();

            int categoriesCount = userCategories.Count;
            int authorsCount = userAuthors.Count;

            int takeCount = 1;
            if (authorsCount <= count)
            {
                takeCount = count / authorsCount;
            }
            if (takeCount > 3) {
                takeCount = 3;
            }

            List<Book> recommended = new List<Book>();
            for (int i = 0; i < userAuthors.Count; i++)
            {
                var b = allBooks.Where(x => x.Author == userAuthors.ElementAt(i)).Take(takeCount);
                recommended.AddRange(b);
            }
            allBooks = allBooks.Except(recommended).ToList();

            if (recommended.Count < count)
            {
                int diff = count - recommended.Count;
                takeCount = diff / categoriesCount + 1;      

                for (int i = 0; i < userCategories.Count; i++)
                {
                    var recB = allBooks.Where(x => x.Category == userCategories.ElementAt(i)).Take(takeCount);
                    recommended.AddRange(recB);
                }
                allBooks = allBooks.Except(recommended).ToList();
                if (recommended.Count < count)
                {
                    recommended.AddRange(allBooks);
                }
                if (recommended.Count < count)
                {
                    recommended.AddRange(_context.Book.Except(recommended));
                }
            }
            recommended = recommended.Take(count).ToList();

            return new ResponseResult<ICollection<Book>> { Error = false, ReturnResult = recommended };
        }
    }
}
