using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface ICommentsService
    {
        Task<ResponseResult<BookComment>> AddComment(BookComment comment);
        Task<ResponseResult<ICollection<BookComment>>> GetComments();
        Task<ResponseResult<BookComment>> GetComment(int id);
    }
}
