using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class Waiting
    {
        public int Id { get; set; }
        public int BookCaseId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual BookCase BookCase { get; set; }
        public virtual User User { get; set; }
    }
}
