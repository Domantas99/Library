using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace BookLibrary.Api.Controllers
{
    // TODO uncomment when login and register is implemented in frontend
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public class ApiControllerBase : ControllerBase
    {
        protected string GetUserId()
        {
            return User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
        }
    }
}