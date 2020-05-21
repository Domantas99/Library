using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookLibrary.Services.Reservations
{
    public class ReservationsService : IReservationsService
    {
        private const string sort_recent = "recent";
        private const string sort_oldest = "oldest";
        private const string sort_title_asc = "titleaz";
        private const string sort_title_dsc = "titleza";
        private const string sort_author_asc = "authoraz";
        private const string sort_author_dsc = "authorza";
        private const string sort_bookedfrom_asc = "fromasc";
        private const string sort_bookedfrom_dsc = "fromdsc";
        private const string sort_returndate_asc = "returnasc";
        private const string sort_returndate_dsc = "returndsc";
        private readonly LibraryDBContext _context;
        public ReservationsService(LibraryDBContext context)
        {
            _context = context;
        }

        public async Task<ResponseResult<Reservation>> AddReservation(Reservation reservation)
        {
            bool flag = false;
            try
            {
                var reservations = await _context.Reservation.Include(x => x.BookCase).ToListAsync();
                int index = reservations.FindIndex(x => x.Id == reservation.Id);
                if (index >= 0)
                {
                    reservations[index].PlannedReturnOn = reservation.PlannedReturnOn;
                    reservations[index].BookCase.ModifiedOn = DateTime.Today;
                }
                else
                {
                    var library = await _context.Library.FirstOrDefaultAsync(x => x.BookId == reservation.BookCase.BookId && x.OfficeId == reservation.BookCase.OfficeId);
                    if (library != null && library.Count > 0)
                    {
                        reservation.Id = 0;
                        _context.Reservation.Add(reservation);
                    }
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var a = ex;
                flag = true;
            }
            return new ResponseResult<Reservation> { Error = flag, ReturnResult = reservation };
        }

        public async Task<ResponseResult<Waiting>> AddWaiting(Waiting waiting)
        {
            bool flag = false;
            try
            {
                var existing = await _context.Waiting.FirstOrDefaultAsync(x => x.UserId == waiting.UserId && x.BookCase.BookId == waiting.BookCase.BookId);

                if (existing == null)
                {
                    var library = await _context.Library.FirstOrDefaultAsync(x => x.BookId == waiting.BookCase.BookId && x.OfficeId == waiting.BookCase.OfficeId);
                    if (library != null && library.Count > 0)
                    {
                        waiting.Id = 0;
                        _context.Waiting.Add(waiting);
                    }

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var a = ex;
                flag = true;
            }
            return new ResponseResult<Waiting> { Error = flag, ReturnResult = waiting };
        }

        public async Task<ResponseResult<Book>> CheckInReservation(int reservationId, CheckInDTO data)
        {
            var reservation = await _context.Reservation.Include(a => a.BookCase).ThenInclude(b => b.Book).FirstOrDefaultAsync(x => x.Id == reservationId);
            Book book = null;
            bool flag = false;
            try
            {
                if (reservation != null)
                {
                    reservation.CheckedInOn = DateTime.Today;
                    book = reservation.BookCase.Book;
                    if (data.Review != null && data.Review.Length > 0) {
                        _context.BookComment.Add(new BookComment{Book = book, Comment = data.Review, CreatedBy = reservation.UserId, CreatedOn = DateTime.Now});
                    }
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                flag = true;
            }
            return new ResponseResult<Book> { Error = flag, ReturnResult = book };
        }

        public async Task<ResponseResult<Book>> RemoveWaiting(int waitingId)
        {
            var waiting = await _context.Waiting.FirstOrDefaultAsync(x => x.Id == waitingId);
            Book book = null;
            bool flag = false;
            try
            {
                if (waiting != null)
                {
                    var bookCase = await _context.BookCase.Include(x => x.Book).FirstOrDefaultAsync(x => x.Id == waiting.BookCaseId);
                    book = bookCase.Book;
                    _context.Waiting.Remove(waiting);
                    _context.BookCase.Remove(bookCase);
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                flag = true;
            }
            return new ResponseResult<Book> { Error = flag, ReturnResult = book };
        }

        private List<ReservationDTO> resultSort(List<ReservationDTO> list, string sort)
        {
            switch (sort)
            {
                case sort_recent:
                    {
                        return list.OrderByDescending(reservation => reservation.Book.ReleaseDate).ToList();
                    }
                case sort_oldest:
                    {
                        return list.OrderBy(reservation => reservation.Book.ReleaseDate).ToList();
                    }
                case sort_title_asc:
                    {
                        return list.OrderBy(reservation => reservation.Book.Title).ToList();
                    }
                case sort_title_dsc:
                    {
                        return list.OrderByDescending(reservation => reservation.Book.Title).ToList();
                    }
                case sort_author_asc:
                    {
                        return list.OrderBy(reservation => reservation.Book.Author).ToList();
                    }
                case sort_author_dsc:
                    {
                        return list.OrderByDescending(reservation => reservation.Book.Author).ToList();
                    }
                case sort_bookedfrom_asc:
                    {
                        return list.OrderBy(reservation => reservation.BookedFrom).ToList();
                    }
                case sort_bookedfrom_dsc:
                    {
                        return list.OrderByDescending(reservation => reservation.BookedFrom).ToList();
                    }
                case sort_returndate_asc:
                    {
                        return list.OrderBy(reservation => reservation.ReturnDate).ToList();
                    }
                case sort_returndate_dsc:
                    {
                        return list.OrderByDescending(reservation => reservation.ReturnDate).ToList();
                    }
                default:
                    {
                        return list;
                    }
            }
        }

        public async Task<ResponseResult<ICollection<ReservationDTO>>> GetReservations(int user) {
            return await GetReservations(user, new List<string>(), new List<string>(), new List<string>(), new List<string>(), sort_recent);
        }

        public async Task<ResponseResult<ICollection<ReservationDTO>>> GetReservations(int user, List<string> category, List<string> offices, List<string> status, List<string> authors, string sort)
        {
            var reservations = await _context.Reservation.Where(x => x.UserId == user && x.CheckedInOn == null)
                .Include(x => x.BookCase).ThenInclude(x => x.Book).Include(x => x.BookCase.Office).Select(x => (ReservationDTO)x).ToListAsync();

            var waitings = await _context.Waiting.Where(x => x.UserId == user)
                .Include(x => x.BookCase.Book).Include(x => x.BookCase.Office).Select(x => (ReservationDTO)x).ToListAsync();

            var response = reservations.Concat(waitings).ToList();
            if (category != null && category.Count > 0)
            {
                response = response.Where(x => category.Contains(x.Book.Category)).ToList();
            }
            if (offices != null && offices.Count > 0)
            {
                response = response.Where(x => offices.Contains(x.Office.Name)).ToList();
            }
            if (status != null && status.Count > 0)
            {
                response = response.Where(x => status.Contains(x.Status)).ToList();
            }
            if (authors != null && authors.Count > 0)
            {
                response = response.Where(x => authors.Contains(x.Book.Author)).ToList();
            }
            response = resultSort(response, sort);
            return new ResponseResult<ICollection<ReservationDTO>> { Error = false, ReturnResult = response };

        }


        public async Task<ResponseResult<PagedList<ReservationDTO>>> GetTeamReservations(List<string> category, List<string> offices, List<string> status, List<string> authors, List<string> users, int page, int pageSize, string sort)
        {
            var reservations = await _context.Reservation.Include(x => x.BookCase.Book).Include(x => x.BookCase.Office).Include(x => x.User).Select(x => (ReservationDTO)x).ToListAsync();
            var waitings = await _context.Waiting.Include(x => x.BookCase.Book).Include(x => x.BookCase.Office).Include(x => x.User).Select(x => (ReservationDTO)x).ToListAsync();
            var results = reservations.Concat(waitings).ToList();
            if (category != null && category.Count > 0) {
                results = results.Where(x => category.Contains(x.Book.Category)).ToList();
            }
            if (offices != null && offices.Count > 0) {
                results = results.Where(x => offices.Contains(x.Office.Name)).ToList();
            }
            if (status != null && status.Count > 0) {
                results = results.Where(x => status.Contains(x.Status)).ToList();
            }
            if (authors != null && authors.Count > 0) {
                results = results.Where(x => authors.Contains(x.Book.Author)).ToList();
            }
            if (users != null && users.Count > 0) {
                results = results.Where(x => users.Contains(x.User.UserName)).ToList();
            }
            results = resultSort(results, sort);
            var response = PagedList<ReservationDTO>.CreateFrom(results, page, pageSize);
            return new PagedResponseResult<PagedList<ReservationDTO>> { Error = false, ReturnResult = response, Page = response.CurrentPage, PageSize = response.PageSize, HasNextPage = response.HasNextPage, HasPreviousPage = response.HasPreviousPage, TotalPages = response.TotalPages, Items = response.Items };
        }

        public async Task<ResponseResult<ICollection<Reservation>>> GetUserCurrentlyReadingReservedBooks(int userId)
        {
            var reservations = await _context.Reservation
                .Include(a => a.BookCase)
                    .ThenInclude(b => b.Book)
                        .Include(o => o.BookCase.Office)
                            .Where(c => c.UserId == userId && c.CheckedOutOn != null && c.CheckedInOn == null)
                                .ToListAsync();

            return new ResponseResult<ICollection<Reservation>> { Error = false, ReturnResult = reservations };
        }

    }
}
