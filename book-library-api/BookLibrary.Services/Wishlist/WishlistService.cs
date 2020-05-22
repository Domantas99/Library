using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Wishlist;
using BookLibrary.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Services.Wishlist
{
    public class WishlistService : IWishlistService
    {
        private readonly LibraryDBContext _context;
        private readonly IBooksService _booksService;

        private const string sort_recent = "recent";
        private const string sort_oldest = "oldest";
        private const string sort_title_asc = "titleaz";
        private const string sort_title_dsc = "titleza";
        private const string sort_author_asc = "authoraz";
        private const string sort_author_dsc = "authorza";
        public WishlistService(LibraryDBContext context, IBooksService booksService)
        {
            _context = context;
            _booksService = booksService;
        }

        public async Task<Wish> AddNewWish(Wish wish)
        {
            bool flag = false;
            try
            {
                _context.Wish.Add(wish);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                flag = true;
            }
            return wish;
        }

        public async Task<ICollection<WishlistItemDTO>> GetWishlist(List<string> categories, List<string> authors, string sort)
        {
            var wishes = await _context.Wish.Include(x => x.Book).Include(x => x.Votes).ToListAsync();
            if (categories != null && categories.Count > 0)
            {
                wishes = wishes.Where(a => a.Book.Category != null && categories.Contains(a.Book.Category)).ToList();
            }
            if (authors.Count > 0)
            {
                wishes = wishes.Where(a => authors.Contains(a.Book.Author)).ToList();
            }
            var wishlist = wishes.Select(x => (WishlistItemDTO)x).ToList();
            switch (sort)
            {
                case sort_recent:
                    {
                        wishlist = wishlist.OrderByDescending(book => book.ReleaseDate).ToList();
                        break;
                    }
                case sort_oldest:
                    {
                        wishlist = wishlist.OrderBy(book => book.ReleaseDate).ToList();
                        break;
                    }
                case sort_title_asc:
                    {
                        wishlist = wishlist.OrderBy(book => book.Title).ToList();
                        break;
                    }
                case sort_title_dsc:
                    {
                        wishlist = wishlist.OrderByDescending(book => book.Title).ToList();
                        break;
                    }
                case sort_author_asc:
                    {
                        wishlist = wishlist.OrderBy(book => book.Author).ToList();
                        break;
                    }
                case sort_author_dsc:
                    {
                        wishlist = wishlist.OrderByDescending(book => book.Author).ToList();
                        break;
                    }
            }
            return wishlist;
        }
        public async Task<UserWish> ManageVote(UserWish userWish)
        {
            bool flag = false;
            var alreadyExists = _context.UserWish.FirstOrDefault(x => x.WishId == userWish.WishId && x.UserId == userWish.UserId);
            try
            {
                if (alreadyExists != null)
                {
                    _context.UserWish.Remove(alreadyExists);
                }
                else
                    _context.UserWish.Add(userWish);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                flag = true;
            }

            return userWish;
        }
        public async Task<ICollection<VoteItemDTO>> GetVote(int userId)
        {
            var voteList = _context.UserWish.Select(x => new VoteItemDTO()
            {
                WishId = x.WishId,
                Vote = x.UserId == userId
            }).ToList();
            
            return voteList;
        }

        public async Task<Book> MoveWishToLibrary(Book book)
        {
            bool flag = false;
            try
            {
                var wishToRemove = _context.Wish.FirstOrDefault(w => w.BookId == book.Id);
                if (wishToRemove.Comment != null && wishToRemove.Comment.Length > 0) {
                    _context.BookComment.Add(new BookComment { Book = book, Comment = wishToRemove.Comment, CreatedBy = wishToRemove.CreatedBy, CreatedOn = wishToRemove.CreatedOn });
                }
                var userwishes = _context.UserWish.Where(w => w.WishId == wishToRemove.Id);
                _context.UserWish.RemoveRange(userwishes);
                _context.Wish.Remove(wishToRemove);
                await _booksService.UpdateBook(book.Id, book);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                flag = true;
            }

            return book;
        }

        public async Task<ICollection<string>> GetCategories()
        {
            var uniqueCategories = _context.Wish.Select(wish => wish.Book).Where(book => book.Category != null).Select(book => book.Category).Distinct().ToList();
            uniqueCategories.Sort();
            return uniqueCategories;
        }

        public async Task<ICollection<string>> GetAuthors()
        {
            var uniqueAuthors = _context.Wish.Select(wish => wish.Book.Author).Distinct().ToList();
            uniqueAuthors.Sort();
            return uniqueAuthors;
        }
    }
}
