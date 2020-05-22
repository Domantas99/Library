using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Response
{
    public class PagedResponseResult<T>
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
        public int TotalPages { get; set; }
        public int Items { get; set; }
        public T Result { get; set; }
    }
}
