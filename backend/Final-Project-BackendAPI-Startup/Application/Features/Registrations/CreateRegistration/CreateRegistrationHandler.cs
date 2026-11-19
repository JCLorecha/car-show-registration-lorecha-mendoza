namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public sealed class CreateRegistrationHandler
    : ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>>
{
    private readonly IAppDbContext _context;

    public CreateRegistrationHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<CreateRegistrationResponse>> HandleAsync(
        CreateRegistrationCommand command,
        CancellationToken cancellationToken = default)
    {
        // Check if the plate number already exists
        var plateExists = await _context.Registrations
            .AnyAsync(
                r => r.PlateNumber == command.PlateNumber,
                cancellationToken);

        if (plateExists)
        {
            return Result<CreateRegistrationResponse>.Failure(
                new Error(
                    "Registration.Conflict",
                    "The plate number is already registered."));
        }

        // Get the next registration number
        var lastRegistration = await _context.Registrations
            .OrderByDescending(r => r.RegistrationNumber)
            .FirstOrDefaultAsync(cancellationToken);

        var nextNumber = 1;

        if (lastRegistration is not null)
        {
            var lastNumber = int.Parse(
                lastRegistration.RegistrationNumber.Split('-')[1]);

            nextNumber = lastNumber + 1;
        }

        var registrationNumber = $"CS27-{nextNumber:D4}";

        // Determine registration fee
        var registrationFee = command.RegistrationType switch
        {
            RegistrationType.Exhibitor => 1500m,
            RegistrationType.Competitor => 2500m,
            RegistrationType.VIP => 5000m,
            _ => 0m
        };

        // Create registration
        var registration = new Registration
        {
            RegistrationNumber = registrationNumber,
            RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName,
            ContactNumber = command.ContactNumber,
            Email = command.Email,
            Address = command.Address,
            CarMakeModel = command.CarMakeModel,
            PlateNumber = command.PlateNumber,
            RegistrationType = command.RegistrationType,
            Status = RegistrationStatus.Pending,
            RegistrationFee = registrationFee,
            AmountPaid = command.AmountPaid
        };

        _context.Registrations.Add(registration);

        await _context.SaveChangesAsync(cancellationToken);

        // Create response
        var response = new CreateRegistrationResponse(
            registration.Id,
            registration.RegistrationNumber,
            registration.RegistrationDate,
            registration.ParticipantName,
            registration.ContactNumber,
            registration.Email,
            registration.Address,
            registration.CarMakeModel,
            registration.PlateNumber,
            registration.RegistrationType,
            registration.Status,
            registration.RegistrationFee,
            registration.AmountPaid,
            registration.PaymentStatus);

        return Result<CreateRegistrationResponse>.Success(response);
    }
}