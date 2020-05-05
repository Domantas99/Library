using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface IUsersService
    {
        Task<ResponseResult<User>> GetUser(int id);
    }
}
