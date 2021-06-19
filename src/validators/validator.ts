import { body, validationResult } from 'express-validator';

const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors: Array<any> = []
    errors.array().map((err: any) => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

export {
    validate,
}

