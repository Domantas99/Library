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
        Task<BookComment> AddComment(BookComment comment);
        Task<ICollection<BookComment>> GetComments();
        Task<BookComment> GetComment(int id);
    }
}
