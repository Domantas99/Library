using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.Services.ExceptionHandling.Exceptions
{
    public class HandledException : Exception
    {
        public HandledException(string message) : base(message) {       }
    }
}
