using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Reservations
{
    public class ReservationsService : IReservationsService
    {
        private const string sort_recent = "recent";
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

        public async Task<ResponseResult<Book>> CheckInReservation(int reservationId)
        {
            var reservation = await _context.Reservation.FirstOrDefaultAsync(x => x.Id == reservationId);
            Book book = null;
            bool flag = false;
            try
            {
                if (reservation != null)
                {
                    var bookCase = await _context.BookCase.Include(x => x.Book).FirstOrDefaultAsync(x => x.Id == reservation.BookCaseId);
                    book = bookCase.Book;
                    _context.BookCase.Remove(bookCase);
                    _context.Reservation.Remove(reservation);
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                flag = true;
            }
            return new ResponseResult<Book> { Error = flag, ReturnResult = book };
        }

        public async Task<ResponseResult<ICollection<ReservationDTO>>> GetReservations(int user)
        {
            var reservations = await _context.Reservation.Where(x => x.UserId == user)
                .Include(x => x.BookCase).ThenInclude(x => x.Book).Include(x => x.BookCase.Office).ToListAsync();
            var response = new List<ReservationDTO>();
            foreach (Reservation reservation in reservations)
            {
                response.Add((ReservationDTO)reservation);
            }
            return new ResponseResult<ICollection<ReservationDTO>> { Error = false, ReturnResult = response };
        }

        public async Task<ResponseResult<PagedList<ReservationDTO>>> GetTeamReservations(int page, int pageSize, string sort)
        {
            var reservations = await _context.Reservation.Include(x => x.BookCase.Book).Include(x => x.BookCase.Office).Include(x => x.User).Select(x => (ReservationDTO)x).ToListAsync();
            switch (sort) {
                case sort_recent:
                    {
                        reservations.Sort((a, b) => Nullable.Compare(a.BookedFrom, b.BookedFrom));
                        break;
                    }
            }
            var response = PagedList<ReservationDTO>.CreateFrom(reservations, page, pageSize);
            return new PagedResponseResult<PagedList<ReservationDTO>> { Error = false, ReturnResult = response, Page = response.CurrentPage, PageSize = response.PageSize, HasNextPage = response.HasNextPage, HasPreviousPage = response.HasPreviousPage };
        }
    }
}
