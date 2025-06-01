using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DotNetServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private static readonly string DataFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "users.json");

        private static List<User> ReadUsers()
        {
            if (!System.IO.File.Exists(DataFile))
                return new List<User>();
            var json = System.IO.File.ReadAllText(DataFile);
            return JsonSerializer.Deserialize<List<User>>(json) ?? new List<User>();
        }

        private static void WriteUsers(List<User> users)
        {
            var json = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(DataFile, json);
        }

        [HttpGet]
        public IActionResult Get() => Ok(ReadUsers());

        [HttpPost]
        public IActionResult Post([FromBody] UserDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { error = "Email required" });

            var users = ReadUsers();
            var id = users.Any() ? users.Max(u => u.Id) + 1 : 1;
            var user = new User { Id = id, Email = dto.Email };
            users.Add(user);
            WriteUsers(users);
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var users = ReadUsers();
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound(new { error = "User not found" });
            users.Remove(user);
            WriteUsers(users);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UserDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { error = "Email required" });

            var users = ReadUsers();
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound(new { error = "User not found" });
            user.Email = dto.Email;
            WriteUsers(users);
            return Ok(user);
        }
    }

    public class User
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("email")]
        public string Email { get; set; } = "";
    }

    public class UserDto
    {
        public string Email { get; set; } = "";
    }
}
