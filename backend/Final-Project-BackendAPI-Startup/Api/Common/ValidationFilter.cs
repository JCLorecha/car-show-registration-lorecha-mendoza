namespace Api.Common;

using FluentValidation;
using Microsoft.AspNetCore.Http;

public sealed class ValidationFilter<T> : IEndpointFilter
    where T : class
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var request = context.Arguments.OfType<T>().FirstOrDefault();

        if (request is null)
        {
            return await next(context);
        }

        var validators = context.HttpContext.RequestServices
            .GetServices<IValidator<T>>();

        var errors = new Dictionary<string, string[]>();

        foreach (var validator in validators)
        {
            var validationResult = await validator.ValidateAsync(
                request,
                context.HttpContext.RequestAborted);

            if (!validationResult.IsValid)
            {
                errors = validationResult.Errors
                    .GroupBy(error => error.PropertyName)
                    .ToDictionary(
                        group => group.Key,
                        group => group.Select(error => error.ErrorMessage).ToArray());

                break;
            }
        }

        if (errors.Count > 0)
        {
            return Results.ValidationProblem(errors);
        }

        return await next(context);
    }
}