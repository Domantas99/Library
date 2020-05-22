using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
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

        public async Task<BookComment> AddComment(BookComment comment)
        {
            bool errorFlag = false;
            try
            {
                _context.BookComment.Add(comment);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                errorFlag = true;
            }

            return comment;
        }

        public async Task<BookComment> GetComment(int id)
        {
            bool errFlag = false;
            var comment = await _context.BookComment.FirstOrDefaultAsync(b => b.Id == id);
            if (comment == null)
            {
                errFlag = true;
            }

            return comment;
        }

        public async Task<ICollection<BookComment>> GetComments()
        {
            var comments = await _context.BookComment.ToListAsync();
            return comments;
        }
    }
}
