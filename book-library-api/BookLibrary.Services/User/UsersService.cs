using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Users;
using BookLibrary.DTO.Wishlist;
using BookLibrary.Services.Contracts;
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

        public async Task<User> GetUser(int id)
        {
            bool flag = false;
            var user = await _context.User.Include(u => u.Office).FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) {
                flag = true;
            }
            return user;
        }

        public async Task<User> UpdateUser(User user)
        {
            bool flag = false;
            try
            {
                _context.User.Update(user);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) {
                flag = true;
            }
            return user;
        }

        public async Task CreateUser(UserRegisterDTO newUserInfo, string aspNetUserId)
        {
            _context.User.Add(new User {
                UserName = newUserInfo.Email,
                Email = newUserInfo.Email,
                FullName = newUserInfo.FullName,
                AspNetUserId = aspNetUserId
            });
            
            await _context.SaveChangesAsync();
        }
    }
}
