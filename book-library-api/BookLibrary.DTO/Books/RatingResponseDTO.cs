using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Books
{
    public class RatingResponseDTO
    {
        public decimal Rating { get; set; }
        public int RatingCount { get; set; }
        public bool UserHasRated { get; set; }
    }
}
