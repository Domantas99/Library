﻿using BookLibrary.DataBase.Models;
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

        public async Task<ResponseResult<Wish>> AddNewWish(Wish wish)
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
            return new ResponseResult<Wish> { Error = flag, ReturnResult = wish };
        }

        public async Task<ResponseResult<ICollection<WishlistItemDTO>>> GetWishlist(List<string> categories, List<string> authors, string sort)
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
            return new ResponseResult<ICollection<WishlistItemDTO>> { Error = false, ReturnResult = wishlist };
        }
        public async Task<ResponseResult<UserWish>> ManageVote(UserWish userWish)
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

            return new ResponseResult<UserWish> { Error = flag, ReturnResult = userWish };
        }
        public async Task<ResponseResult<ICollection<VoteItemDTO>>> GetVote(int userId)
        {
            var voteList = _context.UserWish.Select(x => new VoteItemDTO()
            {
                WishId = x.WishId,
                Vote = x.UserId == userId
            }).ToList();
            
            return new ResponseResult<ICollection<VoteItemDTO>> { Error = false, ReturnResult = voteList };
        }

        public async Task<ResponseResult<Book>> MoveWishToLibrary(Book book)
        {
            bool flag = false;
            try
            {
                var wishToRemove = _context.Wish.FirstOrDefault(w => w.BookId == book.Id);
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

            return new ResponseResult<Book> { Error = flag, ReturnResult = book };
        }

        public Task<ResponseResult<ICollection<string>>> GetCategories()
        {
            var uniqueCategories = _context.Wish.Select(wish => wish.Book).Where(book => book.Category != null).Select(book => book.Category).Distinct().ToList();
            uniqueCategories.Sort();
            return Task.FromResult(new ResponseResult<ICollection<string>> { Error = false, ReturnResult = uniqueCategories });
        }

        public Task<ResponseResult<ICollection<string>>> GetAuthors()
        {
            var uniqueAuthors = _context.Wish.Select(wish => wish.Book.Author).Distinct().ToList();
            uniqueAuthors.Sort();
            return Task.FromResult(new ResponseResult<ICollection<string>> { Error = false, ReturnResult = uniqueAuthors });
        }
    }
}
