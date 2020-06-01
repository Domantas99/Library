using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Users;
using BookLibrary.DTO.Wishlist;
using BookLibrary.Services.Contracts;
using BookLibrary.Services.ExceptionHandling.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services
{
    public class UsersService : IUsersService
    {
        private readonly LibraryDBContext _context;
        public UsersService(LibraryDBContext context)
        {
            _context = context;
        }

        public async Task<User> GetUser(string id)
        {
            var user = await _context.User.Include(u => u.Office).FirstOrDefaultAsync(x => x.AspNetUserId == id);
            if (user == null) {
                throw new HandledException($"User with id: {id} was not found");
            }
            return user;
        }

        public async Task<User> UpdateUser(User user)
        {
            try
            {
                _context.User.Update(user);
                await _context.SaveChangesAsync();
            }
            catch {
                throw new HandledException("There was an error while updating a user");
            }
            return user;
        }

        public async Task CreateUser(UserRegisterDTO newUserInfo, string aspNetUserId)
        {
            try
            {
                _context.User.Add(new User
                {
                    UserName = newUserInfo.Email,
                    Email = newUserInfo.Email,
                    FullName = newUserInfo.FullName,
                    AspNetUserId = aspNetUserId,
                    OfficeId = newUserInfo.OfficeId
                });
            }
            catch
            {
                throw new HandledException("There was an error while creating a new user");
            }
            
            
            await _context.SaveChangesAsync();
        }
        public async Task<List<User>> GetUserList()
        {
            return await _context.User.ToListAsync();
        }
    }
}
