using System;
using System.Collections.Generic;

namespace BookLibrary.DataBase.Models
{
    public partial class Wish
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }

        public virtual Book IdNavigation { get; set; }
    }
}
