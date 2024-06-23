using Microsoft.EntityFrameworkCore;

public class AnimalRepository
{
    private readonly ZooParkDbContext _context;

    public AnimalRepository(ZooParkDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Animal>> GetAnimals()
    {
        return await _context.Animals.ToListAsync();
    }

    public async Task<Animal> GetAnimalById(int id)
    {
        return await _context.Animals.FindAsync(id);
    }

    public async Task<Animal> AddAnimal(Animal animal)
    {
        // Найти сотрудника по animal.EmployeeId
        var employee = await _context.Employees.FindAsync(animal.EmployeeId);

        // Если сотрудник не найден, выбросить исключение или обработать ошибку
        if (employee == null)
        {
            throw new Exception($"Сотрудник с идентификатором {animal.EmployeeId} не найден");
        }

        var addedAnimal = await _context.Animals.AddAsync(animal);
        await _context.SaveChangesAsync();
        return addedAnimal.Entity;
    }

    public async Task UpdateAnimal(Animal animal)
    {
        _context.Animals.Update(animal);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAnimal(int id)
    {
        var animal = await _context.Animals.FindAsync(id);
        _context.Animals.Remove(animal);
        await _context.SaveChangesAsync();
    }
}