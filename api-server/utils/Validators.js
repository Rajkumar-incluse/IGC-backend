const { validationResult, body } = require('express-validator')


exports.validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

// let { FirstName, SurName, PhoneNumber, BusinessEmail, CompanyName, CompanySize, Country, State, LicenseKey  } = req.body;
exports.OrganizationValidations = [
    body('FirstName').exists({ checkFalsy: true, checkNull: true }),
    body('SurName').exists({ checkFalsy: true, checkNull: true }),
    body('PhoneNumber').exists({ checkFalsy: true, checkNull: true }),
    body('BusinessEmail').exists({ checkFalsy: true, checkNull: true }).isEmail().withMessage('Enter valid email'),
    body('CompanyName').exists({ checkFalsy: true, checkNull: true }),
    body('CompanySize').exists({ checkFalsy: true, checkNull: true }),
    body('Country').exists({ checkFalsy: true, checkNull: true }),
    body('State').exists({ checkFalsy: true, checkNull: true }),
    body('LicenseKey').exists({ checkFalsy: true, checkNull: true })
]