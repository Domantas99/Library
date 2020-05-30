using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BookLibrary.Api.Controllers.Reservations
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController: ApiControllerBase
    {
        private readonly IReservationsService _reservationsService;
        public ReservationsController(IReservationsService reservationsService)
        {
            _reservationsService = reservationsService;
        }

        //TODO: Maybe this would be better if it was in a users/{id}/reservations route? Something to consider once we actually implement users.
        [HttpGet("my-reservations")]
        public async Task<ActionResult<ICollection<ReservationDTO>>> GetReservationsForUser([FromQuery]List<string> category, [FromQuery]List<string> offices, [FromQuery] List<string> status, [FromQuery] List<string> authors, [FromQuery] string sort)
        {
            return await _reservationsService.GetReservations(GetUserId(), category, offices, status, authors, sort);
        }

        [HttpGet()]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<PagedResponseResult<PagedList<ReservationDTO>>>> GetTeamReservations([FromQuery]List<string> category, [FromQuery]List<string> offices, [FromQuery] List<string> status, [FromQuery] List<string> authors, [FromQuery] List<string> users, [FromQuery] string sort, [FromQuery] int page = 1, [FromQuery] int pageSize = 10) 
        {
            return await _reservationsService.GetTeamReservations(category, offices, status, authors, users, page, pageSize, sort);
        }

        [HttpPost]
        public async Task<ActionResult<Reservation>> AddReservation(ReservationCreateDto reservation)
        {
            return await _reservationsService.AddReservation(reservation, GetUserId());
        }

        [HttpPost("waiting")]
        public async Task<ActionResult<Waiting>> AddWaiting(Waiting waiting)
        {
            return await _reservationsService.AddWaiting(waiting, GetUserId());
        }
        [HttpDelete("waiting/{waitingId}")]
        public async Task<ActionResult<Book>> RemoveWaiting(int waitingId)
        {
            return await _reservationsService.RemoveWaiting(waitingId);
        }

        [HttpPost("{reservationId}/check-in")]
        public async Task<ActionResult<Book>> CheckInReservation(int reservationId, [FromBody]CheckInDTO data)
        {
            return await _reservationsService.CheckInReservation(reservationId, data);
        }

        [HttpGet("currently-reading")]
        public async Task<ActionResult<ICollection<Reservation>>> GetUserCurrentlyReadingReservedBooks()
        {
            return await _reservationsService.GetUserCurrentlyReadingReservedBooks(GetUserId());
        }
    }
}
