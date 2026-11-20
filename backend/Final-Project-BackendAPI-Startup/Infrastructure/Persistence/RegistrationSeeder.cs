namespace Infrastructure.Persistence;

using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public static class RegistrationSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.Registrations.AnyAsync())
        {
            return;
        }

        var names = new[]
        {
            "Juan Dela Cruz", "Maria Santos", "Pedro Reyes",
            "Ana Garcia", "Mark Villanueva", "Angela Mendoza",
            "Jose Ramirez", "Carlo Bautista", "Sofia Torres",
            "Miguel Flores", "Andrea Cruz", "Daniel Navarro",
            "Nicole Castillo", "Paolo Fernandez", "Jasmine Aquino",
            "Gabriel Lim", "Beatrice Ramos", "Joshua Mercado",
            "Camille Rivera", "Nathan Lopez", "Isabella Diaz",
            "Francis Tan", "Trisha Morales", "Kevin Aguilar",
            "Patricia Gomez"
        };

        var types = Enum.GetValues<RegistrationType>();
        var statuses = Enum.GetValues<RegistrationStatus>();

        var registrations = new List<Registration>();

        for (int i = 0; i < 25; i++)
        {
            var type = types[i % types.Length];

            decimal fee = type switch
            {
                RegistrationType.Exhibitor => 1500m,
                RegistrationType.Competitor => 2500m,
                RegistrationType.VIP => 5000m,
                _ => 0m
            };

            decimal amountPaid = (i % 3) switch
            {
                0 => 0m,
                1 => fee / 2,
                _ => fee
            };

            registrations.Add(new Registration
            {
                RegistrationNumber = $"CS27-{i + 1:D4}",
                RegistrationDate = DateTime.UtcNow.AddDays(-i),
                ParticipantName = names[i],
                ContactNumber = $"09{100000000 + i:D9}",
                Email = $"participant{i + 1}@example.com",
                Address = $"Street {i + 1}, Sorsogon City, Philippines",
                CarMakeModel = i % 2 == 0
                    ? "Toyota Supra"
                    : "Honda Civic",
                PlateNumber = $"ABC-{1000 + i}",
                RegistrationType = type,
                Status = statuses[i % statuses.Length],
                RegistrationFee = fee,
                AmountPaid = amountPaid
            });
        }

        await context.Registrations.AddRangeAsync(registrations);
        await context.SaveChangesAsync();
    }
}