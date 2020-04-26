using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BookLibrary.DataBase.Models
{
    public class UserWish
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WishId { get; set; }
        [ForeignKey("WishId")]
        public virtual ICollection<Wish> Wishes { get; set; }
        [ForeignKey("UserId")]
        public virtual ICollection<User> Users { get; set; }
    }
}
