using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface IReservationsService
    {
        Task<ResponseResult<ICollection<ReservationDTO>>> GetReservations(int user);
        Task<ResponseResult<Reservation>> AddReservation(Reservation reservation);
        Task<ResponseResult<Book>> CheckInReservation(int reservationId);
    }
}
