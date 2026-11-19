namespace Api.Features.Registrations.GetRegistrationById;

using Api.Common;
using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.GetRegistrationById;
using Domain.Common;

public static class GetRegistrationByIdEndpoints
{
    public static RouteGroupBuilder MapGetRegistrationByIdEndpoints(
        this RouteGroupBuilder group)
    {
        group.MapGet("/{id:guid}", async (
            Guid id,
            IQueryHandler<GetRegistrationByIdQuery, Result<GetRegistrationByIdResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetRegistrationByIdQuery(id);

            var result = await handler.HandleAsync(query, cancellationToken);

            if (!result.IsSuccess)
                return result.ToProblemDetails();

            return Results.Ok(result.Value);
        })
        .AddEndpointFilter<ValidationFilter<GetRegistrationByIdQuery>>();

        return group;
    }
}