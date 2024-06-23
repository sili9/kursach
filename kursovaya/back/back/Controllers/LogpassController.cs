using back.Models;
using back.Repositories;
using Microsoft.AspNetCore.Mvc;

	[ApiController]
	[Route("api/[controller]")]
	public class LogpassController : Controller
	{
	private readonly LogpassRepository _logpassRepository;

	public LogpassController(LogpassRepository logpassRepository)
	{
		_logpassRepository = logpassRepository;
	}

	[HttpGet]
	public async Task<IEnumerable<Logpass>> GetLogpasses()
	{
		return await _logpassRepository.GetLogpasses();
	}

	[HttpGet("{login}")]
	public async Task<ActionResult<Logpass>> GetLogpass(string login)
	{
		var logpass = await _logpassRepository.GetLogpassByLogin(login);
		if (logpass == null)
		{
			return NotFound();
		}
		return logpass;
	}

	[HttpPost]
	public async Task<ActionResult<Logpass>> PostLogpass(Logpass logpass)
	{
		try
		{
			var addedLogpass = await _logpassRepository.AddLogpass(logpass);
			return CreatedAtAction(nameof(GetLogpass), new { login = addedLogpass.Login}, addedLogpass);
		}
		catch (Exception ex)
		{
			return BadRequest(ex.Message);
		}
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> PutLogpass(int id, Logpass logpass)
	{
		if (id != logpass.LogpassId)
		{
			return BadRequest();
		}

		await _logpassRepository.UpdateLogpass(logpass);

		return NoContent();
	}

	[HttpDelete("{login}")]
	public async Task<IActionResult> DeleteLogpass(string login)
	{
		await _logpassRepository.DeleteLogpass(login);
		return NoContent();
	}
}
