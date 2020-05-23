using System;
using System.Collections.Generic;
using System.Text;

namespace BookLibrary.DTO.Reservations
{
	public class ReservationCreateDto
	{
		public int? ReservationId { get; set; }
		public int? UserId { get; set; }
		public int BookId { get; set; }
		public int OfficeId { get; set; }
		public DateTime PlannedReturnOn { get; set; }
	}
}
