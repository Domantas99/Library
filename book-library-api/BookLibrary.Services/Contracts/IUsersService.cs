using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Users;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface IUsersService
    {
        Task<User> GetUser(string id);
        Task<List<User>> GetUserList();
        Task<User> UpdateUser(User user);
        Task CreateUser(UserRegisterDTO newUserInfo, string aspNetUserId);
    }
}
