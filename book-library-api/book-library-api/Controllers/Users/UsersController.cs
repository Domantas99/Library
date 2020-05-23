using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

        [HttpGet("")]
        public async Task<ActionResult<User>> GetUser()
        {
            var user = await _usersService.GetUser(GetUserId());

            if (User.IsInRole("Admin"))
            {
                user.IsAdmin = true;
            }

            return user;
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            return await _usersService.UpdateUser(user);
        }

    }
}