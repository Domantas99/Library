using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace BookLibrary.DataBase.Models
{
    [DataContract]
    public partial class Office
    {
        public Office()
        {
            Library = new HashSet<Library>();
            User = new HashSet<User>();
        }
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string FullAddress { get; set; }
        [JsonIgnore]
        public virtual ICollection<Library> Library { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
