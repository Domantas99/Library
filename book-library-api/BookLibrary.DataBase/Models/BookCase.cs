using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class BookCase
    {
        public BookCase()
        {
            BookCaseComment = new HashSet<BookCaseComment>();
            Reservation = new HashSet<Reservation>();
            Waiting = new HashSet<Waiting>();
        }

        public int Id { get; set; }
        public int BookId { get; set; }
        public int OfficeId { get; set; }
        public int Count { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedBy { get; set; }

        public virtual ICollection<BookCaseComment> BookCaseComment { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
        public virtual ICollection<Waiting> Waiting { get; set; }
        public virtual Book Book { get; set; }
        public virtual Office Office { get; set; }
    }
}
