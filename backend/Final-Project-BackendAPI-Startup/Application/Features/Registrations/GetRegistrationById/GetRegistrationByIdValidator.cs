namespace Application.Features.Registrations.GetRegistrationById;

using FluentValidation;

public sealed class GetRegistrationByIdValidator
    : AbstractValidator<GetRegistrationByIdQuery>
{
    public GetRegistrationByIdValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Registration ID is required.");
    }
}