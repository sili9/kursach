using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

public class EmployeeServiceRepository
{
    private readonly ZooParkDbContext _context;

    public EmployeeServiceRepository(ZooParkDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<EmployeeService>> GetAllEmployeeServices()
    {
        return await _context.EmployeeServices
            .Include(es => es.Employee)
            .Include(es => es.Service)
            .Select(es => new EmployeeService
            {
                EmployeeServiceId = es.EmployeeServiceId,
                EmployeeId = es.EmployeeId,
				EmployeeName = es.Employee.Name,
				ServiceId = es.ServiceId,
				ServiceName = es.Service.Name
			})
            .ToListAsync();
    }

	public async Task<EmployeeService> GetEmployeeService(int employeeId, int serviceId)
    {
        return await _context.EmployeeServices
            .Include(es => es.Employee)
            .Include(es => es.Service)
            .FirstOrDefaultAsync(es => es.EmployeeId == employeeId && es.ServiceId == serviceId);
    }

	public async Task<EmployeeService> AddEmployeeService(EmployeeService employeeService)
    {
        _context.EmployeeServices.Add(employeeService);
        await _context.SaveChangesAsync();
        return employeeService;
    }

    public async Task<EmployeeService> UpdateEmployeeService(EmployeeService employeeService, int id)
    {
		_context.EmployeeServices.Update(employeeService);
		await _context.SaveChangesAsync();
		return employeeService;
	}

    public async Task DeleteEmployeeService(int employeeId, int serviceId)
    {
        var employeeService = await _context.EmployeeServices.FindAsync(employeeId, serviceId);
        _context.EmployeeServices.Remove(employeeService);
        await _context.SaveChangesAsync();
    }
}