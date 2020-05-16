using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookLibrary.Api.Controllers.Reservations
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController: ControllerBase
    {
        private readonly IReservationsService _reservationsService;
        public ReservationsController(IReservationsService reservationsService)
        {
            _reservationsService = reservationsService;
        }

        //TODO: Maybe this would be better if it was in a users/{id}/reservations route? Something to consider once we actually implement users.
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<ResponseResult<ICollection<ReservationDTO>>>> GetReservationsForUser(int userId)
        {
            return await _reservationsService.GetReservations(userId);
        }

        [HttpGet()]
        public async Task<ActionResult<ResponseResult<PagedList<ReservationDTO>>>> GetTeamReservations([FromQuery] int page=1, [FromQuery] int pageSize=10, [FromQuery] string sort = "recent") 
        {
            return await _reservationsService.GetTeamReservations(page, pageSize, sort);
        }

        [HttpPost]
        public async Task<ActionResult<ResponseResult<Reservation>>> AddReservation(Reservation reservation)
        {
            return await _reservationsService.AddReservation(reservation);
        }

        [HttpPost("waiting")]
        public async Task<ActionResult<ResponseResult<Waiting>>> AddWaiting(Waiting waiting)
        {
            return await _reservationsService.AddWaiting(waiting);
        }

        [HttpDelete("{reservationId}")]
        public async Task<ActionResult<ResponseResult<Book>>> CheckInReservation(int reservationId)
        {
            return await _reservationsService.CheckInReservation(reservationId);
        }

        [HttpGet("currently-reading/{userId}")]
        public async Task<ActionResult<ResponseResult<ICollection<Reservation>>>> GetUserCurrentlyReadingReservedBooks(int userId)
        {
            return await _reservationsService.GetUserCurrentlyReadingReservedBooks(userId);
        }
    }
}
