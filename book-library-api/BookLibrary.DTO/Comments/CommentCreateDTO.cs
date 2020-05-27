using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Comments
{
    public class CommentCreateDTO
    {
        public int BookId { get; set; }
        public string Comment { get; set; }
    }
}
