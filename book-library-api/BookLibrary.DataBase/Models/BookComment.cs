using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class BookComment
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string Comment { get; set; }
        public int? Rating { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }

        public virtual Book Book { get; set; }
    }
}
