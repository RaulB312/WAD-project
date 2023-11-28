using System.ComponentModel.DataAnnotations;

namespace webapp.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public bool isAdmin { get; set; }
        public string? token { get; set; }
    }
}
