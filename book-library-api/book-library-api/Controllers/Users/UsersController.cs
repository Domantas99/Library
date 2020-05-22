using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Api.Controllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ApiControllerBase
    {
        private IUsersService _usersService;
        private readonly UserManager<IdentityUser> _userManager;

        public UsersController(IUsersService usersService, UserManager<IdentityUser> userManager)
        {
            _usersService = usersService;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseResult<User>>> GetUser(int id)
        {
            var user = await _usersService.GetUser(id);

            if (User.IsInRole("Admin"))
            {
                user.ReturnResult.IsAdmin = true;
            }

            return user;
        }

        [HttpPut]
        public async Task<ActionResult<ResponseResult<User>>> UpdateUser(User user)
        {
            return await _usersService.UpdateUser(user);
        }

    }
}