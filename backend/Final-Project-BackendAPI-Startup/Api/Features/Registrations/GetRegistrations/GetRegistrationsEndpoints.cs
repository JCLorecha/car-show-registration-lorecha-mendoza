namespace Api.Features.Registrations.GetRegistrations;

using Api.Common;
using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.GetRegistrations;
using Domain.Common;

public static class GetRegistrationsEndpoints
{
    public static RouteGroupBuilder MapGetRegistrationsEndpoints(
        this RouteGroupBuilder group)
    {
        group.MapGet("/", async (
            [AsParameters] GetRegistrationsQuery query,
            IQueryHandler<GetRegistrationsQuery, Result<GetRegistrationsResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(query, cancellationToken);

            if (!result.IsSuccess)
                return result.ToProblemDetails();

            return Results.Ok(result.Value);
        })
        .AddEndpointFilter<ValidationFilter<GetRegistrationsQuery>>();

        return group;
    }
}