using DotnetWebApiWithEFCodeFirst.Models;
using Microsoft.AspNetCore.Mvc;
using webapp.Entities;

namespace webapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        public ForumDBContext _context { get; set; }
        public MessagesController(ForumDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post(Message message, string token)
        {
            System.Diagnostics.Debug.WriteLine(token);
            System.Diagnostics.Debug.WriteLine("Hello world");
            User? calling_user = _context.Users.FirstOrDefault(u => u.token == token);
            if(calling_user == null)
            {
                return Unauthorized();
            }

            message.UserId = calling_user.Id;
            _context.Messages.Add(message);
            _context.SaveChanges();
            return Ok(message);
        }

        [HttpGet]
        public IActionResult Get(string token)
        {
            User? calling_user = _context.Users.FirstOrDefault(u => u.token == token);
            if(calling_user == null)
            {
                return Unauthorized();
            }
            var userMessages = _context.Messages.Where(m => m.UserId == calling_user.Id);
            return Ok(userMessages);
        }
        [HttpGet("all")]
        public IActionResult GetAll(string token)
        {
            User? calling_user = _context.Users.FirstOrDefault(u => u.token == token);
            if (calling_user == null)
            {
                return Unauthorized();
            }
            if (!calling_user.isAdmin)
            {
                return Forbid();
            }
            return Ok(_context.Messages);
        }

        [HttpDelete]
        public IActionResult Delete(int id, string token)
        {
            User? calling_user = _context.Users.FirstOrDefault(u => u.token == token);
            if(calling_user == null)
            {
                return Unauthorized();
            }

            Message? message = _context.Messages.FirstOrDefault(m => m.Id == id);
            if(message == null)
            {
                return NotFound();
            }

            if(!calling_user.isAdmin)
            {
                return Forbid();
            }

            _context.Messages.Remove(message);
            _context.SaveChanges();
            return Ok();
        }
    }
}
