using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface IReservationsService
    {
        Task<Waiting> AddWaiting(Waiting waiting, string aspNetUserId);
        Task<List<ReservationDTO>> GetReservations(string aspNetUserId);
        Task<List<ReservationDTO>> GetReservations(string aspNetUserId, List<string> category, List<string> offices, List<string> status, List<string> authors, string sort);
        Task<Reservation> AddReservation(ReservationCreateDto reservation, string aspNetUserId);
        Task<Book> CheckInReservation(int reservationId, CheckInDTO data);
        Task<Book> RemoveWaiting(int waitingId);
        Task<PagedResponseResult<PagedList<ReservationDTO>>> GetTeamReservations(List<string> category, List<string> offices, List<string> status, List<string> authors, List<string> users, int page, int pageSize, string sort);
        Task<List<Reservation>> GetUserCurrentlyReadingReservedBooks(string aspNetUserId);
    }
}
