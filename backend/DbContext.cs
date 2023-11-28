using Microsoft.EntityFrameworkCore;
using webapp.Entities;

namespace DotnetWebApiWithEFCodeFirst.Models
{
    public class ForumDBContext : DbContext
    {
        public ForumDBContext(DbContextOptions<ForumDBContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}