using BookLibrary.DataBase.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Users
{
    public class UserCheckOutDTO
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string ImageUrl { get; set; }

        public UserCheckOutDTO(User user) {
            UserId = user.Id;
            FullName = user.FullName;
            ImageUrl = user.ProfilePictureUrl;
        }
    }
}
