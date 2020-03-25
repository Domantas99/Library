using System.Linq;
using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Test;
using BookLibrary.Services.Contracts;

namespace BookLibrary.Services.Test
{
    public class TestService: ITestService
    {
        LibraryDBContext _db;

        public TestService(LibraryDBContext db)
        {
            _db = db;
        }

        public TestDto GetTest()
        {
            var BookCount = _db.Set<Book>().AsQueryable().Count();

            return new TestDto()
            {
                LibraryName = "All books",
                BookCount = BookCount
            };
        }
    }
}
