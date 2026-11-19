namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;

public sealed record GetRegistrationsQuery(
    RegistrationType? Type = null,
    RegistrationStatus? Status = null,
    string? ParticipantName = null,
    int Page = 1,
    int PageSize = 10
) : IQuery<Result<GetRegistrationsResponse>>;