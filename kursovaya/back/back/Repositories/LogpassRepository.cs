using back.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace back.Repositories
{
	public class LogpassRepository
	{
		private readonly ZooParkDbContext _context;

		public LogpassRepository(ZooParkDbContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<Logpass>> GetLogpasses()
		{
			return await _context.Logpass.ToListAsync();
		}

		public async Task<Logpass> GetLogpassByLogin(string login)
		{
			return await _context.Logpass.FirstOrDefaultAsync(es => es.Login == login);
		}

		public async Task<Logpass> AddLogpass(Logpass logpass)
		{
			var addedLogpass = await _context.Logpass.AddAsync(logpass);
			await _context.SaveChangesAsync();
			return addedLogpass.Entity;
		}

		public async Task UpdateLogpass(Logpass logpass)
		{
			_context.Logpass.Update(logpass);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteLogpass(string login)
		{
			_context.Logpass.Remove(await _context.Logpass.FirstOrDefaultAsync(es => es.Login == login));
			await _context.SaveChangesAsync();
		}
	}
}
