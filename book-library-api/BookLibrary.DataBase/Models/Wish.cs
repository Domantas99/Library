using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookLibrary.DataBase.Models
{
    public partial class Wish
    {
        public int Id { get; set; }
        [Column(TypeName = "Date")]
        public DateTime CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public string Comment { get; set; }
        [ForeignKey("Book")]
        public int BookId { get; set; }
        public virtual Book Book { get; set; }
    }
}
