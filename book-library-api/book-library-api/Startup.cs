using BookLibrary.DataBase.Models;
using BookLibrary.Services;
using BookLibrary.Services.Books;
using BookLibrary.Services.Comments;
using BookLibrary.Services.Contracts;
using BookLibrary.Services.ExceptionHandling;
using BookLibrary.Services.Logger;
using BookLibrary.Services.Offices;
using BookLibrary.Services.Reservations;
using BookLibrary.Services.Wishlist;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NLog;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BookLibrary.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
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

            services.AddSingleton<ILoggerManager, LoggerManager>();

            services.AddControllers().AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
        

            services.AddDbContext<LibraryDBContext>(options =>
            {
                var evdDBString = Environment.GetEnvironmentVariable("LIBRARY_DATABASE_CONNECTION");

                if (evdDBString == null || string.IsNullOrEmpty(evdDBString))
                {
                    evdDBString = Configuration.GetConnectionString("LibraryDB");
                }

                options.UseSqlServer(evdDBString);
            });

            services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<LibraryDBContext>();

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => {
                    options.SlidingExpiration = true;
                    options.ExpireTimeSpan = new TimeSpan(0, 20, 0);
                    options.Events.OnRedirectToLogin = context =>
                    {
                        context.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    };
                    options.Events.OnRedirectToAccessDenied = context =>
                    {
                        context.Response.StatusCode = 403;
                        return Task.CompletedTask;
                    };
                });

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 5;
                options.Password.RequiredUniqueChars = 1;
            });

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

            app.UseCors(c =>
            {
                c.AllowCredentials();
                c.AllowAnyMethod();
                c.AllowAnyHeader();
                c.WithOrigins("http://localhost:3000");
            });

            app.ConfigureCustomExceptionHandler();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSpaStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();

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
