using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Reservations;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Books
{
    public class BookDetailsDTO
    {
        public Book Book { get; set; }
        public int ReadingUserId { get; set; }
        public bool IsUserCurrentlyReading { get; set; }
        public ReservationDTO ActiveReservation { get; set; }
    }
}
