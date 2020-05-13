using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookLibrary.DTO.Response
{
    public class PagedList<T> : IEnumerable<T>
    {
        private IEnumerable<T> _collection;

        public int CurrentPage { get; private set; }
        public bool HasPreviousPage { get => CurrentPage > 1; }
        public bool HasNextPage { get => CurrentPage <= Math.Ceiling((decimal)(_collection.Count() / PageSize)); }

        public int PageSize { get; private set; }
        public static PagedList<T> CreateFrom(ICollection<T> collection, int page, int pageSize) {
            return new PagedList<T> { _collection = collection.Skip((page - 1) * pageSize).Take(pageSize) , CurrentPage = page, PageSize = pageSize};
        }

        public IEnumerator<T> GetEnumerator()
        {
           return _collection.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _collection.GetEnumerator();
        }
    }
}
