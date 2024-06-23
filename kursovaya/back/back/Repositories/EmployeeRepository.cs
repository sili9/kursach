using Microsoft.EntityFrameworkCore;

public class EmployeeRepository
{
    private readonly ZooParkDbContext _context;

    public EmployeeRepository(ZooParkDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Employee>> GetEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    public async Task<Employee> GetEmployeeById(int id)
    {
        return await _context.Employees.FindAsync(id);
    }

    public async Task<Employee> AddEmployee(Employee employee)
    {
        var addedEmployee = await _context.Employees.AddAsync(employee);
        await _context.SaveChangesAsync();
        return addedEmployee.Entity;
    }

    public async Task UpdateEmployee(Employee employee)
    {
        _context.Employees.Update(employee);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
    }
}