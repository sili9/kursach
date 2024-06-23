using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly ServiceRepository _serviceRepository;

    public ServicesController(ServiceRepository serviceRepository)
    {
        _serviceRepository = serviceRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<Service>> GetServices()
    {
        return await _serviceRepository.GetServices();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Service>> GetService(int id)
    {
        var service = await _serviceRepository.GetServiceById(id);
        if (service == null)
        {
            return NotFound();
        }
        return service;
    }

    [HttpPost]
    public async Task<ActionResult<Service>> PostService(Service service)
    {
        var addedService = await _serviceRepository.AddService(service);
        return CreatedAtAction(nameof(GetService), new { id = addedService.ServiceId }, addedService);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutService(int id, Service service)
    {
        if (id != service.ServiceId)
        {
            return BadRequest();
        }

        await _serviceRepository.UpdateService(service);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteService(int id)
    {
        await _serviceRepository.DeleteService(id);
        return NoContent();
    }
}