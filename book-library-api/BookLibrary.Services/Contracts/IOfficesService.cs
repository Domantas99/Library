using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface IOfficesService
    {
        Task<ResponseResult<ICollection<Office>>> GetOffices();
    }
}
