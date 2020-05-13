﻿using BookLibrary.DataBase.Models;
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
        Task<ResponseResult<Waiting>> AddWaiting(Waiting waiting);
        Task<ResponseResult<ICollection<ReservationDTO>>> GetReservations(int user);
        Task<ResponseResult<Reservation>> AddReservation(Reservation reservation);
        Task<ResponseResult<Book>> CheckInReservation(int reservationId);
        Task<ResponseResult<PagedList<ReservationDTO>>> GetTeamReservations(int page, int pageSize);
    }
}
