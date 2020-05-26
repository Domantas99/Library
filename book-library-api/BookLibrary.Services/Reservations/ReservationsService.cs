using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using BookLibrary.Services.ExceptionHandling.Exceptions;
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

        public void AddReservation(ReservationCreateDto reservation, string aspNetUserId)
        {
            var user = _context.User.FirstOrDefault(u => u.AspNetUserId == aspNetUserId);

            if (reservation.ReservationId.HasValue)
            {
                var currentReservation = _context.Reservation.Include(x => x.BookCase).FirstOrDefault(x => x.Id == reservation.ReservationId);
                if (currentReservation == null)
                {
                    throw new HandledException("Reservation not found");
                }

                currentReservation.PlannedReturnOn = reservation.PlannedReturnOn;
                currentReservation.BookCase.ModifiedOn = DateTime.Today;

                _context.Reservation.Update(currentReservation);
            }
                else
                {
                var library = _context.Library.FirstOrDefault(x => x.BookId == reservation.BookId && x.OfficeId == reservation.OfficeId);
                    if (library != null && library.Count > 0)
                    {
                    var timestamp = DateTime.Now;
                    _context.Reservation.Add(new Reservation()
                    {
                        CheckedOutOn = timestamp,
                        PlannedReturnOn = reservation.PlannedReturnOn,
                        UserId = reservation.UserId ?? user.Id,
                        BookCase = new BookCase()
                        {
                            BookId = reservation.BookId,
                            OfficeId = reservation.OfficeId,
                            CreatedOn = timestamp,
                            CreatedBy = user.Id,
                            ModifiedOn = timestamp,
                            ModifiedBy = user.Id,
                            Count = 1,
                    }
                    });
                }
            }

            _context.SaveChangesAsync();
            }

        public async Task<Waiting> AddWaiting(Waiting waiting)
        {
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
            catch
            {
                throw new HandledException("There was an error while joining waitlist");
            }
            return waiting;
        }

        public async Task<Book> CheckInReservation(int reservationId, CheckInDTO data)
        {
            var reservation = await _context.Reservation.Include(a => a.BookCase).ThenInclude(b => b.Book).FirstOrDefaultAsync(x => x.Id == reservationId);
            try
            {
                if (reservation == null)
                {
                    throw new HandledException($"Reservation with id:{reservationId} not found");
                }
                reservation.CheckedInOn = DateTime.Today;
                var book = reservation.BookCase.Book;
                if (data.Review != null && data.Review.Length > 0)
                {
                    _context.BookComment.Add(new BookComment { Book = book, Comment = data.Review, CreatedBy = reservation.UserId, CreatedOn = DateTime.Now });
                }

                await _context.SaveChangesAsync();
                return book;
            }
            catch
            {
                throw new HandledException("There was an error while adding a comment");
            }    
        }

        public async Task<Book> RemoveWaiting(int waitingId)
        {
            var waiting = await _context.Waiting.FirstOrDefaultAsync(x => x.Id == waitingId);     
            try
            {
                if (waiting == null)
                {
                    throw new HandledException($"Waiting with id: {waitingId} was not found");
                }
                var bookCase = await _context.BookCase.Include(x => x.Book).FirstOrDefaultAsync(x => x.Id == waiting.BookCaseId);
                var book = bookCase.Book;
                _context.Waiting.Remove(waiting);
                _context.BookCase.Remove(bookCase);
                await _context.SaveChangesAsync();
                return book;
            }
            catch
            {
                throw new HandledException("There was an error while leaving waitlist");
            }
            
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

        public async Task<List<ReservationDTO>> GetReservations(string user) {
            return await GetReservations(user, new List<string>(), new List<string>(), new List<string>(), new List<string>(), sort_recent);
        }

        public async Task<List<ReservationDTO>> GetReservations(string user, List<string> category, List<string> offices, List<string> status, List<string> authors, string sort)
        {
            var reservations = await _context.Reservation.Where(x => x.User.AspNetUserId == user)
                .Include(x => x.BookCase).ThenInclude(x => x.Book).Include(x => x.BookCase.Office).Select(x => (ReservationDTO)x).ToListAsync();

            var waitings = await _context.Waiting.Where(x => x.User.AspNetUserId == user)
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
            return response ;

        }


        public async Task<PagedResponseResult<PagedList<ReservationDTO>>> GetTeamReservations(List<string> category, List<string> offices, List<string> status, List<string> authors, List<string> users, int page, int pageSize, string sort)
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

            return new PagedResponseResult<PagedList<ReservationDTO>> { 
                Result = response, 
                Page = response.CurrentPage, 
                PageSize = response.PageSize, 
                HasNextPage = response.HasNextPage, 
                HasPreviousPage = response.HasPreviousPage, 
                TotalPages = response.TotalPages, 
                Items = response.Items 
            };
        }

        public async Task<List<Reservation>> GetUserCurrentlyReadingReservedBooks(string userId)
        {
            var reservations = await _context.Reservation
                .Include(a => a.BookCase)
                    .ThenInclude(b => b.Book)
                        .Include(o => o.BookCase.Office)
                            .Where(c => c.User.AspNetUserId == userId && c.CheckedOutOn != null && c.CheckedInOn == null)
                                .ToListAsync();

            return reservations;
        }

    }
}
