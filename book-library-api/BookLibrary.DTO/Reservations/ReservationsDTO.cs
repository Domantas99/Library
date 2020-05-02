using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Reservations
{
    public class ReservationsDTO
    {
        public int Id { get; set; }
        public string CoverPictureUrl { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Office { get; set; }
        public DateTime? BookedFrom { get; set; }
        public DateTime? ReturnDate { get; set; }
        public string Status { get; set; }
    }
}
