using back.Models;
using Microsoft.EntityFrameworkCore;

public class ZooParkDbContext : DbContext
{
    public ZooParkDbContext(DbContextOptions<ZooParkDbContext> options) : base(options)
    {
    }

    public DbSet<Animal> Animals { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<EmployeeService> EmployeeServices { get; set; }
    public DbSet<Logpass> Logpass { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EmployeeService>()
            .HasKey(es => new { es.EmployeeId, es.ServiceId });

        modelBuilder.Entity<EmployeeService>()
            .HasOne(es => es.Employee)
            .WithMany(e => e.EmployeeServices)
            .HasForeignKey(es => es.EmployeeId);

        modelBuilder.Entity<EmployeeService>()
            .HasOne(es => es.Service)
            .WithMany(s => s.EmployeeServices)
            .HasForeignKey(es => es.ServiceId);
    }
}