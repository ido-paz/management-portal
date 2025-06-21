using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace UsersService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly string _connectionString = "Server=localhost;Database=School;User Id=sa;Password=Fast@fast1234;TrustServerCertificate=True;";

        [HttpGet]
        public IActionResult GetAll()
        {
            var groups = new List<Group>();
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("SELECT ID, Name FROM Groups", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        groups.Add(new Group
                        {
                            ID = reader.GetInt32(0),
                            Name = reader.GetString(1)
                        });
                    }
                }
            }
            return Ok(groups);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Group group = null;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("SELECT ID, Name FROM Groups WHERE ID = @id", conn);
                cmd.Parameters.AddWithValue("@id", id);
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        group = new Group
                        {
                            ID = reader.GetInt32(0),
                            Name = reader.GetString(1)
                        };
                    }
                }
            }
            if (group == null) return NotFound();
            return Ok(group);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Group group)
        {
            int newId;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("INSERT INTO Groups (Name) OUTPUT INSERTED.ID VALUES (@name)", conn);
                cmd.Parameters.AddWithValue("@name", group.Name);
                newId = (int)cmd.ExecuteScalar();
            }
            group.ID = newId;
            return CreatedAtAction(nameof(Get), new { id = newId }, group);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Group group)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("UPDATE Groups SET Name = @name WHERE ID = @id", conn);
                cmd.Parameters.AddWithValue("@name", group.Name);
                cmd.Parameters.AddWithValue("@id", id);
                int rows = cmd.ExecuteNonQuery();
                if (rows == 0) return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("DELETE FROM Groups WHERE ID = @id", conn);
                cmd.Parameters.AddWithValue("@id", id);
                int rows = cmd.ExecuteNonQuery();
                if (rows == 0) return NotFound();
            }
            return NoContent();
        }
    }

    public class Group
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
