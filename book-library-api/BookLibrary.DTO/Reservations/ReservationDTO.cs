using BookLibrary.DataBase.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Reservations
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public Book Book { get; set; }
        public Office Office { get; set; }
        public DateTime? BookedFrom { get; set; }
        public DateTime? ReturnDate { get; set; }
        public User User { get; set; }
        public string Status { get; set; }

        public static explicit operator ReservationDTO(Reservation reservation) => new ReservationDTO
        {
            Id = reservation.Id,
            Book = reservation.BookCase?.Book,
            Office = reservation.BookCase?.Office,
            BookedFrom = reservation.CheckedOutOn,
            ReturnDate = reservation.PlannedReturnOn,
            User = reservation.User,
            Status = reservation.CheckedOutOn.HasValue ? reservation.CheckedInOn.HasValue ? "Returned" : "Borrowed" : "Waiting"
        };
        public static explicit operator ReservationDTO(Waiting waiting) => new ReservationDTO
        {
            Id = waiting.Id,
            Book = waiting.BookCase.Book,
            Office = waiting.BookCase.Office,
            BookedFrom = waiting.CreatedOn,
            Status = "Waiting"
        };
    }
}
