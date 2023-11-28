using DotnetWebApiWithEFCodeFirst.Models;
using Microsoft.AspNetCore.Mvc;
using webapp.Entities;

namespace webapp.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        public ForumDBContext _context { get; set; }
        public AuthController(ForumDBContext context)
        {
            _context = context;
        }

        [HttpGet("login")]
        public IActionResult Login([FromQuery]string username, [FromQuery] string password)
        {
            User? db_user = _context.Users.FirstOrDefault(u => u.username == username && u.password == password);
            if(db_user == null)
            {
                return Unauthorized();
            }
            db_user.token = Guid.NewGuid().ToString();
            _context.SaveChanges();
            return Ok(db_user);
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            User? db_user = _context.Users.FirstOrDefault(u => u.username == user.username); 
            if(db_user != null)
            {
                return Conflict();
            }
            user.token = null;
            user.isAdmin = false;
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }

        [HttpPost("register/admin")]
        public IActionResult RegisterAdmin(User user, string pass)
        {
            User? calling_user = _context.Users.FirstOrDefault(u => u.username == user.username);
            if(calling_user != null)
            {
                return Conflict();
            }
            
            if(pass != "MyPassword!")
            {
                return Forbid();
            }

            user.token = null;
            user.isAdmin = true;
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }
    }
}
