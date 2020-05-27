using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class BookComment
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public string Comment { get; set; }
        public int? Rating { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public virtual Book Book { get; set; }
        public virtual User User { get; set; }
    }
}
