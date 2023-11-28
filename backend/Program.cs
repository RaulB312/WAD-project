
using DotnetWebApiWithEFCodeFirst.Models;
using Microsoft.EntityFrameworkCore;

namespace webapp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var DbConfig = builder.Configuration.GetValue<string>("ConnectionStrings:DefaultConnection");
            builder.Services.AddDbContext<ForumDBContext>(options =>options.UseSqlServer(DbConfig));
            // Add services to the container.

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactPolicy",
                    builder => builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors("ReactPolicy");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}