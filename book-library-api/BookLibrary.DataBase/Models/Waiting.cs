using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class Waiting
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual Book Book { get; set; }
        public virtual User User { get; set; }
    }
}
