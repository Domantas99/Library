using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Comments;
using BookLibrary.DTO.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Contracts
{
    public interface ICommentsService
    {
        Task<CommentDTO> AddComment(CommentCreateDTO comment, string userId);
        Task<List<BookComment>> GetComments();
        Task<BookComment> GetComment(int id);
        Task<CommentDTO> DeleteComment(int id, string userId);
    }
}
