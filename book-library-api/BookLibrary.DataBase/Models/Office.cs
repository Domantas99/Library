using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BookLibrary.DataBase.Models
{
    public partial class Office
    {
        public Office()
        {
            Library = new HashSet<Library>();
            User = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string FullAddress { get; set; }
        [JsonIgnore]
        public virtual ICollection<Library> Library { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
