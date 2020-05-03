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
        public Task<ResponseResult<ICollection<ReservationsDTO>>> GetReservations(int user);
    }
}
