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
                _context.Reservation.Add(reservation);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) {
                var a = ex;
                flag = true;
            }
            return new ResponseResult<Reservation> { Error = flag, ReturnResult = reservation };
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
                    CoverPictureUrl = reservation.BookCase.Book.CoverPictureUrl,
                    Title = reservation.BookCase.Book.Title,
                    Author = reservation.BookCase.Book.Author,
                    Office = reservation.BookCase.Office.Name,
                    BookedFrom = reservation.CheckedOutOn,
                    ReturnDate = reservation.PlannedReturnOn,
                    Status = reservation.CheckedOutOn.HasValue ? reservation.CheckedInOn.HasValue ? "Returned" : "Borrowed" : "Waiting"
                });
            }
            return new ResponseResult<ICollection<ReservationsDTO>> { Error = false, ReturnResult = response};
        }
    }
}
