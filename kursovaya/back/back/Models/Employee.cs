using System.ComponentModel.DataAnnotations;

public class Employee
{
    public int EmployeeId { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Speciality { get; set; }
    public string? ImageData {  get; set; }

    [Required(AllowEmptyStrings = true)]
    public ICollection<Animal> Animals { get; set; } = new List<Animal>();

    [Required(AllowEmptyStrings = true)]
    public ICollection<EmployeeService> EmployeeServices { get; set; } = new List<EmployeeService>();
}