using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Offices
{
    public class OfficesService : IOfficesService
    {
        private readonly LibraryDBContext _context;
        public OfficesService(LibraryDBContext context)
        {
            _context = context;
        }

        public Task<ResponseResult<ICollection<Office>>> GetOffices()
        {
            var offices = _context.Office.ToList();
            return Task.FromResult(new ResponseResult<ICollection<Office>> { Error = false, ReturnResult = offices });
        }
    }
}
