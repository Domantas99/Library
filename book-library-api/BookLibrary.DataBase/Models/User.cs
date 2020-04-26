using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class User
    {
        public User()
        {
            Reservation = new HashSet<Reservation>();
            Waiting = new HashSet<Waiting>();
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int OfficeId { get; set; }
        public string GoodReadsAccount { get; set; }

        public virtual Office Office { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
        public virtual ICollection<Waiting> Waiting { get; set; }
        public virtual UserWish UserWish { get; set; }
    }
}
