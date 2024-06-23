using System.ComponentModel.DataAnnotations;

public class Service
{
    public int ServiceId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string AppointmentTime { get; set; }

    [Required(AllowEmptyStrings = true)]
    public ICollection<EmployeeService> EmployeeServices { get; set; } = new List<EmployeeService>();
}