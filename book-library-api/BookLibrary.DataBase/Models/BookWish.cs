using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class BookWish
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int Vote { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }

        public virtual Book Book { get; set; }
    }
}
