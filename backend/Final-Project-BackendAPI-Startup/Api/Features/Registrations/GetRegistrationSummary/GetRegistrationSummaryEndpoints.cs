namespace Api.Features.Registrations.GetRegistrationSummary;

using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.GetRegistrationSummary;
using Domain.Common;

public static class GetRegistrationSummaryEndpoints
{
    public static RouteGroupBuilder MapGetRegistrationSummaryEndpoints(
        this RouteGroupBuilder group)
    {
        group.MapGet("/summary", async (
            IQueryHandler<GetRegistrationSummaryQuery, Result<GetRegistrationSummaryResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var query = new GetRegistrationSummaryQuery();

            var result = await handler.HandleAsync(query, cancellationToken);

            if (!result.IsSuccess)
            {
                return result.ToProblemDetails();
            }

            return Results.Ok(result.Value);
        });

        return group;
    }
}