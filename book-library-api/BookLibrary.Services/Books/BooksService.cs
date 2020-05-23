using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Books;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Users;
using BookLibrary.Services.Contracts;
using BookLibrary.Services.ExceptionHandling.Exceptions;
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

        private const string sort_recent = "recent";
        private const string sort_oldest = "oldest";
        private const string sort_title_asc = "titleaz";
        private const string sort_title_dsc = "titleza";
        private const string sort_author_asc = "authoraz";
        private const string sort_author_dsc = "authorza";
        public BooksService(LibraryDBContext context, IReservationsService reservationsService)
        {
            _context = context;
            _reservationsService = reservationsService;
        }

        public async Task<Book> AddNewBook(AddBookDTO bookDto)
        {
            try
            {
                var library = bookDto.Library;
                var book = new Book
                {
                    Title = bookDto.Title,
                    Isbn = bookDto.Isbn,
                    Author = bookDto.Author,
                    Description = bookDto.Description,
                    Category = bookDto.Category,
                    Tag = bookDto.Tag,
                    Format = bookDto.Format,
                    NumberOfPages = bookDto.NumberOfPages,
                    Series = bookDto.Series,
                    Publisher = bookDto.Publisher,
                    EditionLanguage = bookDto.EditionLanguage,
                    CoverPictureUrl = bookDto.CoverPictureUrl,
                    GoodReadsUrl = bookDto.GoodReadsUrl,
                    DateAdded = bookDto.DateAdded,
                    ReleaseDate = bookDto.ReleaseDate
                };
                _context.Book.Add(book);
                await _context.SaveChangesAsync();

                foreach (var libr in library) {
                    if (libr.Count > 0)
                    {
                        Library lib = new Library
                        {
                            BookId = book.Id,
                            ModifiedOn = null,
                            CreatedOn = DateTime.Today,
                            OfficeId = libr.OfficeId,
                            Count = libr.Count
                        };
                        _context.Library.Add(lib);
                    }
                }

                await _context.SaveChangesAsync();
                return book;
            }
            catch
            {
                throw new HandledException("There was an error adding a book");            
            }
        }

        public async Task<Book> DeleteBook(int id)
        {

            var bookToDelete = _context.Book.FirstOrDefault(b => b.Id == id);
            if (bookToDelete == null)
            {
                throw new HandledException("Book not found when deleting");
            }
            try
            {
                var libraryToRemove = _context.Library.Where(b => b.BookId == id);
                var wishToRemove = _context.Wish.Where(b => b.BookId == id);
                var commentsToRemove = _context.BookComment.Where(b => b.BookId == id);
                _context.BookComment.RemoveRange(commentsToRemove);
                _context.Library.RemoveRange(libraryToRemove);
                _context.RemoveRange(wishToRemove);
                _context.Book.Remove(bookToDelete);
                await _context.SaveChangesAsync();

                return bookToDelete;
            }
            catch {
                throw new HandledException("There was an error while deleting a book");
            }
              
        }

        public async Task<BookDetailsDTO> GetBook(int bookId, int userId)
        {
            var book = await _context.Book.Include(x => x.Library).FirstOrDefaultAsync(b => b.Id == bookId);

            if (book == null)
            {
                throw new HandledException("Book not found");
            }

            var userReservations = _reservationsService.GetReservations(userId).Result;
            var reservation = userReservations.Where(x => x.Status != "Waiting" && x.Status != "Returned").FirstOrDefault(x => x.Book.Id == bookId);
            bool isCurrentlyReading = false;

            bool isAnyoneReading = false;

            if (reservation != null)
            {
                isCurrentlyReading = true;
                isAnyoneReading = true;
            }
    
            if (isCurrentlyReading == false)
            {
                var allReservations = _context.Reservation.Where(r => r.CheckedInOn == null);
                var anyActiveReservation = allReservations.FirstOrDefault(x => x.BookCase.BookId == bookId);
                if (anyActiveReservation != null)
                {
                    isAnyoneReading = true;
                }
            }

            var bookDetailsDTO = new BookDetailsDTO {
                Book = book,
                IsUserCurrentlyReading = isCurrentlyReading, 
                IsAnyoneReading=isAnyoneReading, 
                ReadingUserId = userId, 
                ActiveReservation= reservation, 
                Library = book.Library,
                NotReadingUsers = GetNotReadingBookUsers(bookId)
            };

            return bookDetailsDTO;
        }

        public List<UserCheckOutDTO> GetNotReadingBookUsers(int bookId) {
            var readingUsers = _context.Reservation.Where(r => r.CheckedInOn == null).Include(a => a.BookCase).ToArray().Where(x=>x.BookCase.BookId == bookId).Select(x=>x.User);
            var users = _context.User.ToList().Except(readingUsers).ToArray();
            List<UserCheckOutDTO> userList = new List<UserCheckOutDTO>();
            for (int i = 0; i < users.Count(); i++)
            {
                userList.Add(new UserCheckOutDTO(users[i]));
            }
            return userList;
        }


        public async Task<List<Library>> GetBookAvailability(int bookId)
        {
            var libraries = await _context.Library.Include(lib => lib.Office).Where(lib => lib.BookId == bookId).ToListAsync();
            var reservations = await _context.Reservation.Include(a => a.BookCase).ThenInclude(b => b.Book).Where(x => x.BookCase.BookId == bookId).ToListAsync();

            for (int i = 0; i < reservations.Count; i++)
            {
                int index = libraries.FindIndex(a => a.BookId == reservations[i].BookCase.BookId &&
                                                a.OfficeId == reservations[i].BookCase.OfficeId &&
                                                reservations[i].CheckedInOn == null);
                if (index >= 0)
                {
                    libraries[index].Count -= reservations[i].BookCase.Count;
                }
            }

            return libraries;
        }

        public Task<List<BookListDTO>> GetBooks(List<string> categories, List<string> offices, string status, List<string> authors, int userOffice, string sort)
        {
            try
            {
                var books = BooksWithoutWishes();
                if (categories != null && categories.Count > 0)
                {
                    books = books.Where(a => a.Category != null && categories.Contains(a.Category)).ToList();
                }
                if (authors.Count > 0)
                {
                    books = books.Where(a => authors.Contains(a.Author)).ToList();
                }
                if (offices.Count > 0)
                {
                    var booksInOffices = _context.Library.Where(a => offices.Contains(a.Office.Name)).Select(a => a.Book.Id).Distinct();
                    books = books.Where(a => booksInOffices.Contains(a.Id)).ToList();
                }
                if (!(status == null))
                {
                    //TODO Book status needs to get redone from "are there copies in library" if I recall the meeting correctly. 
                }
                switch (sort)
                {
                    case sort_recent:
                        {
                            books = books.OrderByDescending(book => book.ReleaseDate).ToList();
                            break;
                        }
                    case sort_oldest:
                        {
                            books = books.OrderBy(book => book.ReleaseDate).ToList();
                            break;
                        }
                    case sort_title_asc:
                        {
                            books = books.OrderBy(book => book.Title).ToList();
                            break;
                        }
                    case sort_title_dsc:
                        {
                            books = books.OrderByDescending(book => book.Title).ToList();
                            break;
                        }
                    case sort_author_asc:
                        {
                            books = books.OrderBy(book => book.Author).ToList();
                            break;
                        }
                    case sort_author_dsc:
                        {
                            books = books.OrderByDescending(book => book.Author).ToList();
                            break;
                        }
                }
                List<BookListDTO> bookList = AddAvailabilityInList(books, userOffice);
                return Task.FromResult(bookList);
            }
            catch {
                throw new HandledException("There was an error when geting books");
            }
        }
        private List<BookListDTO> AddAvailabilityInList(List<Book> books, int? userOffice)
        {
            List<BookListDTO> bookList = new List<BookListDTO>();
            foreach (Book book in books)
            {
                bool avail = false;

                var booksAvailable = GetBookAvailability(book.Id);
                if (booksAvailable.Result != null)
                {
                    if (!userOffice.HasValue)
                    {
                        var count = booksAvailable.Result.Where(x => x.OfficeId == userOffice)
                        .Select(x => x.Count).FirstOrDefault();
                        if (count != 0)
                            avail = true;
                    } 
                    else
                    {
                        avail = booksAvailable.Result.Any(x => x.Count > 0);
                    }
                }
                bookList.Add(new BookListDTO
                {
                    Id = book.Id,
                    Title = book.Title,
                    Isbn = book.Isbn,
                    Author = book.Author,
                    Description = book.Description,
                    Category = book.Category,
                    Tag = book.Tag,
                    Format = book.Format,
                    NumberOfPages = book.NumberOfPages,
                    Series = book.Series,
                    Publisher = book.Publisher,
                    EditionLanguage = book.EditionLanguage,
                    CoverPictureUrl = book.CoverPictureUrl,
                    GoodReadsUrl = book.GoodReadsUrl,
                    IsArchived = book.IsArchived,
                    DateAdded = book.DateAdded,
                    ReleaseDate = book.ReleaseDate,
                    IsAvailableInMyOffice = avail
                });
            }
            return bookList;
        }
        public Task<List<string>> GetCategories()
        {
            var books = BooksWithoutWishes();
            var uniqueCategories = books.Where(book => book.Category != null).Select(book => book.Category).Distinct(StringComparer.CurrentCultureIgnoreCase).ToList();
            uniqueCategories.Sort();
            return Task.FromResult(uniqueCategories);
        }

        public Task<List<string>> GetAuthors()
        {
            var books = BooksWithoutWishes();
            var uniqueAuthors = books.Select(book => book.Author).Distinct(StringComparer.CurrentCultureIgnoreCase).ToList();
            uniqueAuthors.Sort();
            return Task.FromResult(uniqueAuthors);
        }

        public Task<List<BookComment>> GetComments(int bookId)
        {
            var comments = _context.BookComment.Where(comment => comment.BookId == bookId).ToList();
            return Task.FromResult(comments);
        }

        public Task<List<Book>> GetFilteredBooks(string pattern)
        {
            pattern = pattern.ToLower();
            var books = BooksWithoutWishes();
            var filteredBooks =  books.Where(book => (book.Title.ToLower().Contains(pattern) ||
                                                            book.Author.ToLower().Contains(pattern) ||
                                                            book.Isbn.ToLower().Contains(pattern)) &&
                                                            book.IsArchived == false)
                                                            .ToList();

            return Task.FromResult(filteredBooks);
        }

        public Task<List<BookListDTO>> GetLatestBooks(int count, int userOffice)
        {
            var books = BooksWithoutWishes();
            books.Sort((a, b) => DateTime.Compare(b.DateAdded, a.DateAdded));
            var bookList = AddAvailabilityInList(books, userOffice);
            
            return Task.FromResult(bookList.Take(count).ToList());
        }

        public async Task<Book> UpdateBook(int id, Book book)
        {
            try
            {
                book.Id = id;
                var newLibrary = new List<Library>();
                foreach (var lib in book.Library)
                {
                    if (lib.Count > 0)
                    {
                        var oldLib = _context.Library.Where(x => x.BookId == id && x.OfficeId == lib.OfficeId).FirstOrDefault();
                        if (oldLib != null)
                        {
                            oldLib.ModifiedOn = DateTime.Today;
                            oldLib.Count = lib.Count;
                            newLibrary.Add(oldLib);
                        }
                        else
                        {
                            lib.BookId = id;
                            newLibrary.Add(lib);
                        }
                    }
                }
                _context.Library.RemoveRange(_context.Library.Where(x => x.BookId == book.Id && !newLibrary.Contains(x)));
                book.Library = newLibrary;
                _context.Book.Update(book);
                await _context.SaveChangesAsync();
                return book;
            }
            catch
            {
                throw new HandledException("Book update failed");
            }
        }

        private List<Book> BooksWithoutWishes()
        {
            var books = _context.Book.ToList();
            var wishes = _context.Wish.Include(w => w.Book).ToList();
            for (int i = 0; i < wishes.Count; i++)
            {
                books.Remove(wishes[i].Book);
            }
            return books;
        }

        public Task<List<BookListDTO>> GetUserRecommendedBooks(int userId, int count)
        {
            var allBooks = BooksWithoutWishes();
            
            var reservations = _context.Reservation.Where(x => x.UserId == userId).Select(x => x.BookCase.Book).Distinct().ToList();
            allBooks = allBooks.Except(reservations).ToList();

            var userCategories = reservations.Select(x => x.Category).Distinct().ToList();
            var userAuthors = reservations.Select(x => x.Author).Distinct().ToList();

            int categoriesCount = userCategories.Count;
            int authorsCount = userAuthors.Count;

            int takeCount = 1;
            if (authorsCount <= count && authorsCount > 0)
            {
                takeCount = count / authorsCount;
            }
            if (takeCount > 3)
            {
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
                if (categoriesCount > 0)
                {
                    takeCount = diff / categoriesCount + 1;
                    for (int i = 0; i < userCategories.Count; i++)
                    {
                        var recB = allBooks.Where(x => x.Category == userCategories.ElementAt(i)).Take(takeCount);
                        recommended.AddRange(recB);
                    }
                }
                allBooks = allBooks.Except(recommended).ToList();
                if (recommended.Count < count)
                {
                    recommended.AddRange(allBooks);
                }
                if (recommended.Count < count)
                {
                    recommended.AddRange(BooksWithoutWishes().Except(recommended));
                }
            }
            var userOffice = _context.User.Where(x => x.Id == userId).Select(x => x.OfficeId).FirstOrDefault();
            var bookList = AddAvailabilityInList(recommended, userOffice);
            bookList = bookList.Take(count).ToList();

            return Task.FromResult(bookList);
        }

        public async Task<Book> SetBookArchiveStatus(int bookId, bool isArchived)
        {
            var book = await _context.Book.FirstOrDefaultAsync(x => x.Id == bookId);
            if (book != null)
            {
                book.IsArchived = isArchived;
                _context.Book.Update(book);
                await _context.SaveChangesAsync();
            }

            return book;
        }

        public async Task<List<ReservationDTO>> GetReservations(int id)
        {
            var reservations = await _context.Reservation.Include(x => x.BookCase).ThenInclude(x => x.Book).Include(x => x.BookCase.Office).Include(x => x.User).Where(x => x.BookCase.BookId == id && x.CheckedInOn == null).Select(x => (ReservationDTO)x).ToListAsync();
            var waitings = await _context.Waiting.Include(x => x.BookCase).ThenInclude(x => x.Book).Include(x => x.BookCase.Office).Include(x => x.User).Where(x => x.BookCase.Book.Id == id).Select(x => (ReservationDTO)x).ToListAsync();

            var concat = reservations.Concat(waitings).ToList();
            return  concat;
        }
    }
}
