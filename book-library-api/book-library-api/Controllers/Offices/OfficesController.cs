using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookLibrary.DataBase.Models;
using BookLibrary.DTO.Response;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Api.Controllers.Offices
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficesController : ApiControllerBase
    {
        private readonly IOfficesService _officesService;
        public OfficesController(IOfficesService booksService)
        {
            _officesService = booksService;
        }

        
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<ICollection<Office>>> GetOffices()
        {
            return await _officesService.GetOffices();
        }

    }
}