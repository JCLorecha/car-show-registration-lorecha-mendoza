namespace Api.Features.Registrations.CreateRegistration;

using Api.Common;
using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Domain.Common;

public static class CreateRegistrationEndpoints
{
    public static RouteGroupBuilder MapCreateRegistrationEndpoints(
        this RouteGroupBuilder group)
    {
        group.MapPost("/", async (
            CreateRegistrationCommand command,
            ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(command, cancellationToken);

            if (!result.IsSuccess)
            {
                return result.ToProblemDetails();
            }

            return Results.Created(
                $"/api/registrations/{result.Value!.Id}",
                result.Value);
        })
        .AddEndpointFilter<ValidationFilter<CreateRegistrationCommand>>();

        return group;
    }
}