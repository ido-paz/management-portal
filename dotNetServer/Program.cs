var builder = WebApplication.CreateBuilder(args);

// Get port from environment variable PORT, default to 3000
var port = Environment.GetEnvironmentVariable("PORT");
if (!int.TryParse(port, out var portNumber))
{
    portNumber = 3000;
}

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalhostPolicy", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:8080",
            "http://127.0.0.1:8080"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("LocalhostPolicy");
app.MapControllers();

app.Run($"http://0.0.0.0:{portNumber}");
