using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Response
{
    public class ResponseResult<T>
    {
        public bool Error { get; set; }
        public T ReturnResult { get; set; }
    }
}
