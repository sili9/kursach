using Microsoft.EntityFrameworkCore;

public class ServiceRepository
{
    private readonly ZooParkDbContext _context;

    public ServiceRepository(ZooParkDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Service>> GetServices()
    {
        return await _context.Services.ToListAsync();
    }

    public async Task<Service> GetServiceById(int id)
    {
        return await _context.Services.FindAsync(id);
    }

    public async Task<Service> AddService(Service service)
    {
        var addedService = await _context.Services.AddAsync(service);
        await _context.SaveChangesAsync();
        return addedService.Entity;
    }

    public async Task UpdateService(Service service)
    {
        _context.Services.Update(service);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteService(int id)
    {
        var service = await _context.Services.FindAsync(id);
        _context.Services.Remove(service);
        await _context.SaveChangesAsync();
    }
}