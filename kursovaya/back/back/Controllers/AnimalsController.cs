using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AnimalsController : ControllerBase
{
    private readonly AnimalRepository _animalRepository;

    public AnimalsController(AnimalRepository animalRepository)
    {
        _animalRepository = animalRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<Animal>> GetAnimals()
    {
        return await _animalRepository.GetAnimals();
    }
 
    [HttpGet("{id}")]
    public async Task<ActionResult<Animal>> GetAnimal(int id)
    {
        var animal = await _animalRepository.GetAnimalById(id);
        if (animal == null)
        {
            return NotFound();
        }
        return animal;
    }

    [HttpPost]
    public async Task<ActionResult<Animal>> PostAnimal(Animal animal)
    {
        try
        {
            var addedAnimal = await _animalRepository.AddAnimal(animal);
            return CreatedAtAction(nameof(GetAnimal), new { id = addedAnimal.AnimalId }, addedAnimal);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAnimal(int id, Animal animal)
    {
        if (id != animal.AnimalId)
        {
            return BadRequest();
        }

        await _animalRepository.UpdateAnimal(animal);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAnimal(int id)
    {
        await _animalRepository.DeleteAnimal(id);
        return NoContent();
    }
}