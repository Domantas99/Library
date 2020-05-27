using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Comments;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using BookLibrary.Services.ExceptionHandling.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Comments
{
    public class CommentsService : ICommentsService
    {

        private readonly LibraryDBContext _context;
        public CommentsService(LibraryDBContext context)
        {
            _context = context;
        }

        public async Task<CommentDTO> AddComment(CommentCreateDTO comment, string userId)
        {
            try
            {
                var user = _context.User.Where(x => x.AspNetUserId == userId).FirstOrDefault();
                var newComment = new BookComment { BookId = comment.BookId, Comment = comment.Comment, CreatedOn = DateTime.Now, UserId = user.Id };
                _context.BookComment.Add(newComment);
                await _context.SaveChangesAsync();
                return (CommentDTO)newComment;
            }
            catch
            {
                throw new HandledException("There was an error adding a comment");
            }
        }

        public async Task<CommentDTO> DeleteComment(int id, string userId)
        {
            var user = _context.User.Where(x => x.AspNetUserId == userId).FirstOrDefault();
            var comment = _context.BookComment.Include(x => x.User).Where(x => x.Id == id).FirstOrDefault();

            if (user.IsAdmin || user.Id == comment.UserId)
            {
                _context.BookComment.Remove(comment);
                await _context.SaveChangesAsync();
            }
            else {
                throw new HandledException("Only the comment's author or an admin can delete a comment");
            }

            return (CommentDTO)comment;
        }

        public async Task<BookComment> GetComment(int id)
        {
            var comment = await _context.BookComment.FirstOrDefaultAsync(b => b.Id == id);
            if (comment == null)
            {
                throw new HandledException("There was an error getting a comment");
            }

            return comment;
        }

        public async Task<List<BookComment>> GetComments()
        {
            var comments = await _context.BookComment.ToListAsync();
            return comments;
        }
    }
}
