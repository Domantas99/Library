using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Reservations;
using BookLibrary.DTO.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Books
{
    public class BookDetailsDTO
    {
        public Book Book { get; set; }
        public bool IsUserCurrentlyReading { get; set; }
        public ReservationDTO ActiveReservation { get; set; }
        public ICollection<Library> Library { get; set; }
        public bool IsAnyoneReading { get; set; }
        public List<UserCheckOutDTO> NotReadingUsers { get; set; }
    }
}
