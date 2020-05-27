using BookLibrary.DataBase.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Users
{
	public class UserRegisterDTO
	{
		public string Email { get; set; }
		public string Password { get; set; }
		public int OfficeId { get; set; }
		public string FullName { get; set; }
	}
}
