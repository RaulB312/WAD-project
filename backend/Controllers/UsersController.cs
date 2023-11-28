using DotnetWebApiWithEFCodeFirst.Models;
using Microsoft.AspNetCore.Mvc;
using webapp.Entities;

namespace webapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        public ForumDBContext _context { get; set; }
        public UsersController(ForumDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post(User user, string token)
        {
            User? calling_user = _context.Users.FirstOrDefault(u => u.token == token);
            if(calling_user == null)
            {
                return Unauthorized();
            }
            if (!calling_user.isAdmin)
            {
                return Forbid();
            }

            user.token = null;
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }

        [HttpGet]
        public IActionResult Get(string token)
        {
            User? calling_user = _context.Users.FirstOrDefault(u => u.token == token);
            if(calling_user == null)
            {
                return Unauthorized();
            }

            return Ok(calling_user);
        }
        [HttpGet("all")]
        public IActionResult GetAll(string token)
        {
            User? calling_user = _context.Users.FirstOrDefault(u => u.token == token);
            if(calling_user == null)
            {
                return Unauthorized();
            }
            if (!calling_user.isAdmin)
            {
                return Forbid();
            }

            return Ok(_context.Users.ToList());
        }
        [HttpPut]
        public IActionResult Put(User user, string token)
        {
            User? calling_user = _context.Users.FirstOrDefault(u => u.token == token);
            if(calling_user == null)
            {
                return Unauthorized();
            }
            if (!calling_user.isAdmin)
            {
                return Forbid();
            }

            User? user_to_update = _context.Users.FirstOrDefault(u => u.Id == user.Id);
            if(user_to_update == null)
            {
                return NotFound();
            }
            user_to_update.username = user.username;
            user_to_update.password = user.password;
            user_to_update.isAdmin = user.isAdmin;
            _context.SaveChanges();
            return Ok(user_to_update);
        }
        [HttpDelete]
        public IActionResult Delete(int id, string token)
        {
            User? calling_user = _context.Users.FirstOrDefault(u => u.token == token);
            if(calling_user == null)
            {
                return Unauthorized();
            }
            if (!calling_user.isAdmin)
            {
                return Forbid();
            }

            User? user_to_delete = _context.Users.FirstOrDefault(u => u.Id == id);
            if(user_to_delete == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user_to_delete);
            _context.SaveChanges();
            return Ok(user_to_delete);
        }
    }
}
