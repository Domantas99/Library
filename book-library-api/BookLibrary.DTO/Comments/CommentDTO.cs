using BookLibrary.DataBase.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Comments
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Comment { get; set; }
        public string PictureUrl { get; set; }

        public static explicit operator CommentDTO(BookComment comment) => new CommentDTO{
            Id = comment.Id,
            UserName = comment.User.FullName,
            UserId = comment.UserId,
            BookId = comment.BookId,
            CreatedOn = comment.CreatedOn,
            Comment = comment.Comment,
            PictureUrl = comment.User.ProfilePictureUrl
        };
    }
}
