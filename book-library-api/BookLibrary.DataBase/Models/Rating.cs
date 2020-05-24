using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text;

namespace BookLibrary.DataBase.Models
{
    [DataContract]
    public class Rating
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int Value
        {
            get; set;
        }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public virtual Book Book { get; set; }
        public virtual User User { get; set; }

    }
}
