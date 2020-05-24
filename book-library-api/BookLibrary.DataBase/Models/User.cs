using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace BookLibrary.DataBase.Models
{
    [DataContract]
    public partial class User
    {
        public User()
        {
            Reservation = new HashSet<Reservation>();
            Waiting = new HashSet<Waiting>();
        }

        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string FullName { get; set; }
        [DataMember]
        public string Role { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string PhoneNumber { get; set; }
        [DataMember]
        public string GoodReadsAccount { get; set; }
        [DataMember]
        public string ProfilePictureUrl { get; set; }
        [DataMember]
        public bool IsAdmin { get; set; }
        [DataMember]
        public int? OfficeId { get; set; }
        [DataMember]
        [ForeignKey("OfficeId")]
        public virtual Office Office { get; set; }
        [DataMember]
        public string AspNetUserId { get; set; }
        [ForeignKey("AspNetUserId")]
        public virtual IdentityUser AspNetUser { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
        public virtual ICollection<Waiting> Waiting { get; set; }
        public virtual ICollection<UserWish> UserWish { get; set; }
        public virtual ICollection<Rating> Rating { get; set; }
    }
}
