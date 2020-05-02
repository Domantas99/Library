using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class Reservation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BookCaseId { get; set; }
        public DateTime? CheckedInOn { get; set; }
        public DateTime? CheckedOutOn { get; set; }
        public DateTime? PlannedReturnOn { get; set; }

        public virtual BookCase BookCase { get; set; }
        public virtual User User { get; set; }
    }
}
