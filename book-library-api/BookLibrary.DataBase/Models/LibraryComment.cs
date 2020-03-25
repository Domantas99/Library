using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class LibraryComment
    {
        public int Id { get; set; }
        public int LibraryId { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }

        public virtual Library Library { get; set; }
    }
}
