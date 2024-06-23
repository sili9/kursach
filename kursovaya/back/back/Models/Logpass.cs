using System.ComponentModel.DataAnnotations.Schema;

namespace back.Models
{
	public class Logpass
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int LogpassId { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
	}
}
