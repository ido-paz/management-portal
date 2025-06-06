var builder = WebApplication.CreateBuilder(args);
// Get port from environment variable PORT, default to 3000
var portFromCMD = Environment.GetCommandLineArgs().FirstOrDefault(arg => arg.StartsWith("--port="));    
var portFromEnv = Environment.GetEnvironmentVariable("PORT");
if (!int.TryParse(portFromEnv, out var portNumber))
    portNumber = 3000;
else if (portFromCMD != null && portFromCMD.Contains("="))
{
    var portStr = portFromCMD.Split('=')[1];
    if (!int.TryParse(portStr, out portNumber))
        portNumber = 3000; // Fallback to default if parsing fails
}

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalhostPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("LocalhostPolicy");
app.MapControllers();

app.Run($"http://0.0.0.0:{portNumber}");
