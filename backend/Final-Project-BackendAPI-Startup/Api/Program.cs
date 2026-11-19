using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Domain.Common;
using FluentValidation;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Application.Features.Registrations.CreateRegistration;
using Api.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrations;
using Api.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationById;
using Api.Features.Registrations.GetRegistrationById;

var builder = WebApplication.CreateBuilder(args);

// Database - SQLite
builder.Services.AddDbContext<IAppDbContext, AppDbContext>(options => options.UseSqlite("Data Source=carshow.db"));

// Validators
builder.Services.AddValidatorsFromAssembly(typeof(IAppDbContext).Assembly);

// Handlers
builder.Services.AddScoped<ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>>,CreateRegistrationHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationsQuery, Result<GetRegistrationsResponse>>,GetRegistrationsHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationByIdQuery, Result<GetRegistrationByIdResponse>>,GetRegistrationByIdHandler>();

// API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, _, _) =>
    {
        document.Info.Title = "Car Show 2027 Registration System";
        document.Info.Description = "AutoVista Events Car Show 2027 Registration API";
        return Task.CompletedTask;
    });
});

var app = builder.Build();

// Seed data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // dbContext.<Entities>.AddRange(...);

    dbContext.SaveChanges();
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// Root endpoint
app.MapGet("/", () => "Welcome to the Car Show 2027 Registration API! Go to /scalar/v1 for API documentation.");

// Map endpoints
app.MapGroup("/api/registrations")
    .MapCreateRegistrationEndpoints()
    .MapGetRegistrationsEndpoints()
    .MapGetRegistrationByIdEndpoints();

app.Run();