using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BookLibrary.DTO.Users;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Api.Controllers.Auth
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly SignInManager<IdentityUser> _signInManager;
		private readonly UserManager<IdentityUser> _userManager;
		private readonly IUsersService _usersService;

		public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IUsersService usersService) {
			this._signInManager = signInManager; 
			this._userManager = userManager;
			_usersService = usersService;
		}

		[HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register([FromBody]UserRegisterDTO userDetails)
		{
			// TODO: Add validation here

			var identityUser = new IdentityUser() { UserName = userDetails.Email, Email = userDetails.Email };

			var result = await _userManager.CreateAsync(identityUser, userDetails.Password);


			if (!result.Succeeded)
			{
				return new BadRequestObjectResult(new { Message = "User Registration Failed" });
			}

			var user = await _userManager.FindByNameAsync(userDetails.Email);

			await _usersService.CreateUser(userDetails, user.Id);

			return await Login(userDetails);
		}

		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> Login([FromBody]UserRegisterDTO credentials)
		{
			var identityUser = await _userManager.FindByNameAsync(credentials.Email);
			var roles = await _userManager.GetRolesAsync(identityUser);
			if (identityUser == null) {
				return new BadRequestObjectResult(new { Message = "Login failed" });
			}

			var result = _userManager.PasswordHasher.VerifyHashedPassword(identityUser, identityUser.PasswordHash, credentials.Password);

			if (result == PasswordVerificationResult.Failed) {
				return new BadRequestObjectResult(new { Message = "Login failed" });
			}

			var claims = new List<Claim> {
				new Claim(ClaimTypes.Email, identityUser.Email),
				new Claim(ClaimTypes.Name, identityUser.UserName),
				new Claim(ClaimTypes.NameIdentifier, identityUser.Id),
				new Claim(ClaimTypes.Role, roles.FirstOrDefault())
				// TODO Add more claims here
			};
			var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
			await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

			return Ok(new { Message = "You are logged in" });
		}

		[HttpPost]
		[Route("logout")]
		public async Task<IActionResult> Logout() {
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
			return Ok(new { Message = "You are logged out" });
		}
	}
}