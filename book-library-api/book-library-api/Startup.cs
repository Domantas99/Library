using BookLibrary.Services;
using BookLibrary.Services.Books;
using BookLibrary.Services.Comments;
using BookLibrary.Services.Contracts;
using BookLibrary.Services.Offices;
using BookLibrary.Services.Reservations;
using BookLibrary.Services.Wishlist;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace BookLibrary.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("all", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
            services.AddControllers().AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );


            services.AddDbContext<DataBase.Models.LibraryDBContext>(options =>
            {
                try
                {
                    options.UseSqlServer(Configuration.GetConnectionString("LIBRARY_DATABASE_CONNECTION"));
                }
                catch
                {
                    options.UseSqlServer(Configuration.GetConnectionString("LibraryDB"));
                }
            });

            services.AddDbContext<DataBase.Models.LibraryDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("LibraryDB")));

            services.AddScoped<IBooksService, BooksService>();
            services.AddScoped<ICommentsService, CommentsService>();
            services.AddScoped<IOfficesService, OfficesService>();
            services.AddScoped<IReservationsService, ReservationsService>();
            services.AddScoped<IWishlistService, WishlistService>();
            services.AddScoped<IUsersService, UsersService>();

            services.AddSpaStaticFiles(options =>
            {
                options.RootPath = "wwwroot";
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("all");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.DefaultPage = "/index.html";
            });
        }
    }
}
