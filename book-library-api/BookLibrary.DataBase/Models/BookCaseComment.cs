using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class BookCaseComment
    {
        public int Id { get; set; }
        public int BookCaseId { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }

        public virtual BookCase BookCase { get; set; }
    }
}
