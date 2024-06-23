using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class EmployeeService
{
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int EmployeeServiceId { get; set; }
	public int EmployeeId { get; set; }
	public string? EmployeeName { get; set; }
	public int ServiceId { get; set; }
	public string? ServiceName { get; set; }

	[JsonIgnore]
    public Employee? Employee { get; set; }

	[JsonIgnore]
    public Service? Service { get; set; }
}