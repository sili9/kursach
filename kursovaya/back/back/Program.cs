using back.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ���������� �������� � ���������
builder.Services.AddDbContext<ZooParkDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<AnimalRepository>();
builder.Services.AddScoped<EmployeeRepository>();
builder.Services.AddScoped<ServiceRepository>();
builder.Services.AddScoped<EmployeeServiceRepository>();
builder.Services.AddScoped<LogpassRepository>();

// ���������� �������� CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// ��������� ��������� HTTP-��������
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ��������� �������� CORS
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();