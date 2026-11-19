namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationsHandler
    : IQueryHandler<GetRegistrationsQuery, Result<GetRegistrationsResponse>>
{
    private readonly IAppDbContext _context;

    public GetRegistrationsHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<GetRegistrationsResponse>> HandleAsync(
        GetRegistrationsQuery query,
        CancellationToken cancellationToken = default)
    {
        var registrations = _context.Registrations.AsQueryable();

        // Filter by registration type
        if (query.Type.HasValue)
        {
            registrations = registrations.Where(
                r => r.RegistrationType == query.Type.Value);
        }

        // Filter by registration status
        if (query.Status.HasValue)
        {
            registrations = registrations.Where(
                r => r.Status == query.Status.Value);
        }

        // Filter by participant name (case-insensitive, partial match)
        if (!string.IsNullOrWhiteSpace(query.ParticipantName))
        {
            var name = query.ParticipantName.Trim().ToLower();

            registrations = registrations.Where(
                r => r.ParticipantName.ToLower().Contains(name));
        }

        // Get the total count before pagination
        var totalCount = await registrations.CountAsync(cancellationToken);

        // Calculate total pages
        var totalPages = totalCount == 0
            ? 0
            : (int)Math.Ceiling((double)totalCount / query.PageSize);

        // Sort newest first, then apply pagination
        var items = await registrations
            .OrderByDescending(r => r.RegistrationDate)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(cancellationToken);

        // Map registrations to DTOs
        var registrationDtos = items.Select(r => new RegistrationDto(
            r.Id,
            r.RegistrationNumber,
            r.RegistrationDate,
            r.ParticipantName,
            r.ContactNumber,
            r.Email,
            r.Address,
            r.CarMakeModel,
            r.PlateNumber,
            r.RegistrationType,
            r.Status,
            r.RegistrationFee,
            r.AmountPaid,
            r.PaymentStatus
        )).ToList();

        // Create response
        var response = new GetRegistrationsResponse(
            registrationDtos,
            query.Page,
            query.PageSize,
            totalCount,
            totalPages);

        return Result<GetRegistrationsResponse>.Success(response);
    }
}