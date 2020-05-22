using BookLibrary.DataBase.Models;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace BookLibrary.Services.ExceptionHandling
{
    public static class MiddlewareExtensions
    {
        public static void ConfigureCustomExceptionHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
          
        }
    }
}
