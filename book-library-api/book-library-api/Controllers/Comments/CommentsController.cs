using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Comments;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Api.Controllers.Comments
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ApiControllerBase
    {

        private readonly ICommentsService _commentsService;
        public CommentsController(ICommentsService commentsService)
        {
            _commentsService = commentsService;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<BookComment>>> GetComments()
        {
            return await _commentsService.GetComments();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookComment>> GetBookComment(int id)
        {
            return await _commentsService.GetComment(id);
        }

        [HttpPost]
        public async Task<ActionResult<CommentDTO>> AddComment([FromBody] CommentCreateDTO comment)
        {
            return await _commentsService.AddComment(comment, GetUserId());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<CommentDTO>> DeleteComment(int id) {
            return await _commentsService.DeleteComment(id, GetUserId());
        }
    }
}
