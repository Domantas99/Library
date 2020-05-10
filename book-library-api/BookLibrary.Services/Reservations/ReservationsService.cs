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
                var reservations = await _context.Reservation.Include(x=>x.BookCase).ToListAsync();
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
            catch (Exception ex) {
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

        public async Task<ResponseResult<ICollection<ReservationsDTO>>> GetReservations(int user)
        {
            var reservations = await _context.Reservation.Where(x => x.UserId == user)
                .Include(x => x.BookCase.Book).Include(x => x.BookCase.Office).ToListAsync();
            var response = new List<ReservationsDTO>();
            foreach (Reservation reservation in reservations) {
                response.Add(new ReservationsDTO
                {
                    Id = reservation.Id,
                    Book = reservation.BookCase.Book,
                    Office = reservation.BookCase.Office,
                    BookedFrom = reservation.CheckedOutOn,
                    ReturnDate = reservation.PlannedReturnOn,
                    Status = reservation.CheckedOutOn.HasValue ? reservation.CheckedInOn.HasValue ? "Returned" : "Borrowed" : "Waiting"
                });
            }
            return new ResponseResult<ICollection<ReservationsDTO>> { Error = false, ReturnResult = response};
        }
    }
}
