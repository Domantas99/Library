using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.DTO.Wishlist;
using BookLibrary.Services.Contracts;
using BookLibrary.Services.ExceptionHandling.Exceptions;
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
        private const string sort_votes_asc = "votesasc";
        private const string sort_votes_dsc = "votesdsc";
        public WishlistService(LibraryDBContext context, IBooksService booksService)
        {
            _context = context;
            _booksService = booksService;
        }

        public async Task<Wish> AddNewWish(Wish wish)
        {
            try
            {
                _context.Wish.Add(wish);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new HandledException("There was an error while adding new wish");
            }
            return wish;
        }


        public async Task<List<WishlistItemDTO>> GetWishlist(List<string> categories, List<string> authors, string sort, string aspNetUserId)
        {
            var wishes = await _context.Wish.Include(x => x.Book).Include(x => x.Votes).ThenInclude(x => x.User).ToListAsync();
            if (categories != null && categories.Count > 0)
            {
                wishes = wishes.Where(a => a.Book.Category != null && categories.Contains(a.Book.Category)).ToList();
            }
            if (authors.Count > 0)
            {
                wishes = wishes.Where(a => authors.Contains(a.Book.Author)).ToList();
            }
            var wishlist = wishes.Select(wish => new WishlistItemDTO
            {
                WishId = wish.Id,
                Id = wish.Book.Id,
                Title = wish.Book.Title,
                Author = wish.Book.Author,
                CoverPictureUrl = wish.Book.CoverPictureUrl,
                DateAdded = wish.Book.DateAdded,
                ReleaseDate = wish.Book.ReleaseDate,
                Votes = wish.Votes.Count,
                UserVoted = wish.Votes.Where(x => x.UserId == 1).Any()
            }).ToList();

            switch (sort)
            {
                case sort_recent:
                    {
                        wishlist = wishlist.OrderByDescending(wish => wish.ReleaseDate).ToList();
                        break;
                    }
                case sort_oldest:
                    {
                        wishlist = wishlist.OrderBy(wish => wish.ReleaseDate).ToList();
                        break;
                    }
                case sort_title_asc:
                    {
                        wishlist = wishlist.OrderBy(wish => wish.Title).ToList();
                        break;
                    }
                case sort_title_dsc:
                    {
                        wishlist = wishlist.OrderByDescending(wish => wish.Title).ToList();
                        break;
                    }
                case sort_author_asc:
                    {
                        wishlist = wishlist.OrderBy(wish => wish.Author).ToList();
                        break;
                    }
                case sort_author_dsc:
                    {
                        wishlist = wishlist.OrderByDescending(wish => wish.Author).ToList();
                        break;
                    }
                case sort_votes_asc:
                    {
                        wishlist = wishlist.OrderBy(wish => wish.Votes).ToList();
                        break;
                    }
                case sort_votes_dsc:
                    {
                        wishlist = wishlist.OrderByDescending(wish => wish.Votes).ToList();
                        break;
                    }
            }
            return wishlist;
        }

        public void ManageVote(int id)
        {
            var wish = _context.Wish.Where(x => x.Id == id).Include(x => x.Votes).FirstOrDefault();
            var userId = 1;
            if (wish == null)
            {
                throw new HandledException("No such wishlist book exists");
            }
            var existingUserWish = wish.Votes.Where(x => x.UserId == userId).FirstOrDefault();
            if (existingUserWish == null)
            {
                _context.UserWish.AddAsync(new UserWish()
                {
                    UserId = userId,
                    WishId = id
                });
            }
            else
            {
                _context.UserWish.Remove(existingUserWish);
            }
            _context.SaveChanges();
        }

        public Task<List<VoteItemDTO>> GetVote(int userId)
        {
            var voteList = _context.UserWish.Select(x => new VoteItemDTO()
            {
                WishId = x.WishId,
                Vote = x.UserId == userId
            }).ToList();

            return Task.FromResult(voteList);
        }

        public async Task<Book> MoveWishToLibrary(Book book)
        {
            try
            {
                var wishToRemove = _context.Wish.FirstOrDefault(w => w.BookId == book.Id);
                if (wishToRemove.Comment != null && wishToRemove.Comment.Length > 0)
                {
                    _context.BookComment.Add(new BookComment { Book = book, Comment = wishToRemove.Comment, UserId = wishToRemove.CreatedBy, CreatedOn = wishToRemove.CreatedOn });
                }
                var userwishes = _context.UserWish.Where(w => w.WishId == wishToRemove.Id);
                _context.UserWish.RemoveRange(userwishes);
                _context.Wish.Remove(wishToRemove);
                await _booksService.UpdateBook(book.Id, book);
                await _context.SaveChangesAsync();
                return book;
            }
            catch
            {
                throw new HandledException("There was an error while moving book from wishlist to library");
            }
        }

        public Task<List<string>> GetCategories()
        {
            var uniqueCategories = _context.Wish.Select(wish => wish.Book).Where(book => book.Category != null).Select(book => book.Category).Distinct().ToList();
            uniqueCategories.Sort();
            return Task.FromResult(uniqueCategories);
        }

        public Task<List<string>> GetAuthors()
        {
            var uniqueAuthors = _context.Wish.Select(wish => wish.Book.Author).Distinct().ToList();
            uniqueAuthors.Sort();
            return Task.FromResult(uniqueAuthors);
        }
    }
}
