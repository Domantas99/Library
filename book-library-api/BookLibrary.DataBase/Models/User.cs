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
        public string FullName { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string GoodReadsAccount { get; set; }
        public string ProfilePictureUrl { get; set; }
        public int OfficeId { get; set; }
        public virtual Office Office { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
        public virtual ICollection<Waiting> Waiting { get; set; }
        public virtual ICollection<UserWish> UserWish { get; set; }
    }
}
