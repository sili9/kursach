using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class EmployeeServicesController : ControllerBase
{
    private readonly EmployeeServiceRepository _employeeServiceRepository;

    public EmployeeServicesController(EmployeeServiceRepository employeeServiceRepository)
    {
        _employeeServiceRepository = employeeServiceRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<EmployeeService>> GetAllEmployeeServices()
    {
        return await _employeeServiceRepository.GetAllEmployeeServices();
    }

    [HttpGet("{employeeId}/{serviceId}")]
    public async Task<ActionResult<EmployeeService>> GetEmployeeService(int employeeId, int serviceId)
    {
        var employeeService = await _employeeServiceRepository.GetEmployeeService(employeeId, serviceId);
        if (employeeService == null)
        {
            return NotFound();
        }
        return employeeService;
    }

    [HttpPost]
    public async Task<ActionResult<EmployeeService>> PostEmployeeService(EmployeeService employeeService)
    {
        var addedEmployeeService = await _employeeServiceRepository.AddEmployeeService(employeeService);
        return CreatedAtAction(nameof(GetAllEmployeeServices), new { id = addedEmployeeService.EmployeeServiceId }, addedEmployeeService);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutEmployeeService(int id, EmployeeService employeeService)
    {
        if (id != employeeService.EmployeeServiceId)
        {
            return BadRequest();
        }

        await _employeeServiceRepository.UpdateEmployeeService(employeeService, id);
        return NoContent();
    }

    [HttpDelete("{employeeId}/{serviceId}")]
    public async Task<IActionResult> DeleteEmployeeService(int employeeId, int serviceId)
    {
        await _employeeServiceRepository.DeleteEmployeeService(employeeId, serviceId);
        return NoContent();
    }
}