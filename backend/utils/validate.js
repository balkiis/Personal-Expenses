const joi = require('@hapi/joi')
const joiDate = require('@joi/date')
const jDate = joi.extend(joiDate)
const logger = require('../Utils/logger')
const eventValidation = (data) => {
    const schema = joi.object({
        title: joi.string().trim().min(5).max(60).required().messages({
            'string.base': `Title should be a type of 'text'`,
            'string.empty': `Title cannot be an empty field`,
            'string.min': `Title should have a minimum length of 10`,
            'string.max': `Title should have a maximum length of 60`,
            'any.required': `Title is a required field`
        }),
        description: joi.string().trim().min(100).required().messages({
            'string.base': `Description should be a type of 'text'`,
            'string.empty': `Description cannot be an empty field`,
            'string.min': `Description should have a minimum length of 100`,
            'any.required': `Description is a required field`
        }),
        active: joi.boolean().required().messages({
            'boolean.base': `Active should be yes or no`,
            'boolean.empty': `Active cannot be an empty field`,
            'any.required': `Active is a required field`
        }),
        availableFromDate: jDate.date().format('YYYY-MM-DD').raw().required().messages({
            'date.base': `From Date should be a valid date`,
            'date.format': `From Date must be in YYYY-MM-DD format`,
            'date.empty': `From Date cannot be an empty field`,
            'date.greater': `From Date must be greater than today`,
            'any.required': `From Date is a required field`
        }),
        availableToDate: jDate.date().format('YYYY-MM-DD').greater(jDate.ref('availableFromDate')).greater('now').raw().required().messages({
            'date.base': `To Date should be a valid date`,
            'date.format': `To Date must be in YYYY-MM-DD format`,
            'date.greater': `To Date must be greater than From Date and the current date`,
            'date.empty': `To Date cannot be an empty field`,
            'any.required': `To Date is a required field`
        }),
        startDate: jDate.date().iso().raw().greater(jDate.ref('availableFromDate')).greater('now').required().messages({
            'date.base': `Start Date should be a valid date`,
            'date.format': `Start Date must be in YYYY-MM-DD HH:MM format`,
            'date.greater': `Start Date must be greater than From Date and the current date`,
            'date.empty': `Start Date cannot be an empty field`,
            'any.required': `Start Date is a required field`
        }),
        endDate: jDate.date().iso().raw().min(jDate.ref('startDate')).greater(jDate.ref('availableFromDate')).greater('now').required().messages({
            'date.base': `End Date should be a valid date`,
            'date.format': `End Date must be in YYYY-MM-DD HH:MM format`,
            'date.greater': `End Date must be greater than From Date and the current date`,
            'date.min': `End Date must be greater or equal than Start Date`,
            'date.empty': `End Date cannot be an empty field`,
            'any.required': `End Date is a required field`
        }),
        address: joi.string().trim().min(20).required().messages({
            'string.base': `Address should be a type of 'text'`,
            'string.empty': `Address cannot be an empty field`,
            'string.min': `Address should have a minimum length of 20`,
            'any.required': `Address is a required field`
        }),
        location: eventLocation().required().messages({
            'object.base': `Location is a type of map location X and Y`,
            'any.required': `Location is a required field`
        }),
    })
    return schema.validate(data)
}
const photoValidation = (data) => {
    const schema = joi.object({
        photo: photo().required().messages({
            'object.base': `Photo is a type of image (png, jpg, jpeg)`,
            'any.required': `Photo is a required field`
        }),
    })
    return schema.validate(data)
}
const photo = () => joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
    size: joi.number().required(),
})
const eventLocation = () => joi.object({
    X: joi.number().required().messages({
        'number.base': `Location.X should be a type of 'number'`,
        'any.required': `Location.X is a required field`
    }),
    Y: joi.number().required().messages({
        'number.base': `Location.Y should be a type of 'number'`,
        'any.required': `Location.Y is a required field`
    })
})
const userValidationData = (data) => {
    const schema = joi.object({
        fName: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `First Name should be a type of 'text'`,
            'string.empty': `First Name cannot be an empty field`,
            'string.min': `First Name should have a minimum length of 3`,
            'string.max': `First Name should have a maximum length of 30`,
            'any.required': `First Name is a required field`
        }),
        lName: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `Last Name should be a type of 'text'`,
            'string.empty': `Last Name cannot be an empty field`,
            'string.min': `Last Name should have a minimum length of 3`,
            'string.max': `Last Name should have a maximum length of 30`,
            'any.required': `Last Name is a required field`
        }),
        username: joi.string().trim().insensitive().lowercase().min(5).max(30).pattern(new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)).required().messages({
            'string.base': `Username should be a type of 'text'`,
            'string.empty': `Username cannot be an empty field`,
            'string.lowercase': `Username must be lowercase`,
            "string.pattern.base": `Invalid username`,
            'string.min': `Username should have a minimum length of 5`,
            'string.max': `Username should have a maximum length of 30`,
            'any.required': `Username is a required field`
        }),
        email: joi.string().trim().min(10).required().email().messages({
            'string.base': `Email should be a type of 'text'`,
            'string.empty': `Email cannot be an empty field`,
            'string.email': `Email invalid email address`,
            'string.min': `Email should have a minimum length of 10`,
            'any.required': `Email is a required field`
        }),
        password: joi.string().trim().min(8).max(30).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{6,})")).required().messages({
            'string.base': `Password should be a type of 'text'`,
            'string.empty': `Password cannot be an empty field`,
            'string.pattern.base': `Password should contain at least 1 lowercase, at least 1 uppercase alphabetical, at least 1 numeric, at least one special character, must be six characters or longer"`,
            'string.min': `Password should have a minimum length of 8`,
            'string.max': `Password should have a maximum length of 30`,
            'any.required': `Password is a required field`
        }),
        userType: joi.number().valid(1, 2).required().messages({
            'string.max': `User Type must be 1 or 2`,
            'any.required': `User Type is a required field`
        })
    })
    return schema.validate(data)
}
const userValidationOtherData = (data) => {
    const schema = joi.object({
        fName: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `First Name should be a type of 'text'`,
            'string.empty': `First Name cannot be an empty field`,
            'string.min': `First Name should have a minimum length of 3`,
            'string.max': `First Name should have a maximum length of 30`,
            'any.required': `First Name is a required field`
        }),
        lName: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `Last Name should be a type of 'text'`,
            'string.empty': `Last Name cannot be an empty field`,
            'string.min': `Last Name should have a minimum length of 3`,
            'string.max': `Last Name should have a maximum length of 30`,
            'any.required': `Last Name is a required field`
        }),
        userType: joi.number().messages({
            'string.max': `User Type must be 1 or 2`,
            'any.required': `User Type is a required field`
        })
    })
    return schema.validate(data)
}
const userValidationUsername = (data) => {
    const schema = joi.object({
        username: joi.string().trim().alphanum().insensitive().lowercase().min(5).max(30).pattern(new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)).required().messages({
            'string.base': `'Username' should be a type of 'text'`,
            'string.empty': `'Username' cannot be an empty field`,
            'string.lowercase': `'Username' must be lowercase`,
            'string.pattern.base': `Invalid username fromat`,
            'string.min': `'Username' should have a minimum length of 5`,
            'string.max': `'Username' should have a maximum length of 30`,
            'any.required': `'Username' is a required field`
        }),
    })
    return schema.validate(data)
}
const userValidationEmail = (data) => {
    const schema = joi.object({
        email: joi.string().trim().min(3).max(30).required().email().messages({
            'string.base': `'Email' should be a type of 'text'`,
            'string.empty': `'Email' cannot be an empty field`,
            'string.email': `'Email' invalid email address format`,
            'string.min': `'Email' should have a minimum length of 10`,
            'any.required': `'Email' is a required field`
        }),
    })
    return schema.validate(data)
}
const userValidationPassword = (data) => {
    const schema = joi.object({
        password: joi.string().trim().min(8).max(30).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{6,})")).required().messages({
            'string.base': `Password should be a type of 'text'`,
            'string.empty': `Password cannot be an empty field`,
            'string.pattern.base': `Strong Password should contain at least 1 lowercase, at least 1 uppercase alphabetical, at least 1 numeric, at least one special character, must be six characters or longer`,
            'string.min': `Password should have a minimum length of 8`,
            'string.max': `Password should have a maximum length of 30`,
            'any.required': `Password is a required field`
        }),
    })
    return schema.validate(data)
}
const contactValidation = (data) => {
    const schema = joi.object({
        fName: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `First Name should be a type of 'text'`,
            'string.empty': `First Name cannot be an empty field`,
            'string.min': `First Name should have a minimum length of 3`,
            'string.max': `First Name should have a maximum length of 30`,
            'any.required': `First Name is a required field`
        }),
        lName: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `Last Name should be a type of 'text'`,
            'string.empty': `Last Name cannot be an empty field`,
            'string.min': `Last Name should have a minimum length of 3`,
            'string.max': `Last Name should have a maximum length of 30`,
            'any.required': `Last Name is a required field`
        }),
        companyName: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `Company Name should be a type of 'text'`,
            'string.empty': `Company Name cannot be an empty field`,
            'string.min': `Company Name should have a minimum length of 3`,
            'string.max': `Company Name should have a maximum length of 30`,
            'any.required': `Company Name is a required field`
        }),
        subject: joi.string().trim().min(3).max(100).required().messages({
            'string.base': `Subject should be a type of 'text'`,
            'string.empty': `Subject cannot be an empty field`,
            'string.min': `Subject should have a minimum length of 3`,
            'string.max': `Subject should have a maximum length of 100`,
            'any.required': `Subject is a required field`
        }),
        message: joi.string().trim().min(20).required().messages({
            'string.base': `Message should be a type of 'text'`,
            'string.empty': `Message cannot be an empty field`,
            'string.min': `Message should have a minimum length of 20`,
            'any.required': `Message is a required field`
        })
    })
    return schema.validate(data)
}
const memberValidation = (data) => {
    const schema = joi.object({
        fName: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `First Name should be a type of 'text'`,
            'string.empty': `First Name cannot be an empty field`,
            'string.min': `First Name should have a minimum length of 3`,
            'string.max': `First Name should have a maximum length of 30`,
            'any.required': `First Name is a required field`
        }),
        lName: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `Last Name should be a type of 'text'`,
            'string.empty': `Last Name cannot be an empty field`,
            'string.min': `Last Name should have a minimum length of 3`,
            'string.max': `Last Name should have a maximum length of 30`,
            'any.required': `Last Name is a required field`
        }),
        position: joi.string().trim().min(3).max(30).required().messages({
            'string.base': `Position should be a type of 'text'`,
            'string.empty': `Position cannot be an empty field`,
            'string.min': `Position should have a minimum length of 3`,
            'string.max': `Position should have a maximum length of 30`,
            'any.required': `Position is a required field`
        }),
        social: social().required().messages({
            'object.base': `Social should be a type of 'Social media links'`,
            'object.empty': `Social cannot be an empty field`,
            'any.required': `Social is a required field`
        })
    })
    return schema.validate(data)
}
const social = () => joi.object({
    facebook: joi.string().trim().pattern(new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i')).messages({
            'string.base': `Facebook should be a type of 'Link'`,
            'string.empty': `Facebook cannot be an empty field`,
            'string.pattern.base': `Invalid Facebook link`,
        }),
    twitter: joi.string().trim().pattern(new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i')).messages({
            'string.base': `Twitter should be a type of 'Link'`,
            'string.empty': `Twitter cannot be an empty field`,
            'string.pattern.base': `Invalid Twitter link`,
        }),
    linkedIn: joi.string().trim().pattern(new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i')).messages({
            'string.base': `LinkedIn should be a type of 'Link'`,
            'string.empty': `LinkedIn cannot be an empty field`,
            'string.pattern.base': `Invalid LinkedIn link`,
        }),
})
const companyValidation = (data) => {
    const schema = joi.object({
        phone: joi.string().trim().min(8).max(15).required().messages({
            'string.base': `Phone is a type of phone number`,
            'string.empty': `Phone is a not allowed to be empty`,
            'string.min': `Phone must be at least 8 characters long`,
            'string.max': `Phone must be at least 15 characters long`,
            'any.required': `Phone is a required field`
        }),
    })
    return schema.validate(data)
}
module.exports = { eventValidation, photoValidation, userValidationData, userValidationOtherData, userValidationUsername, userValidationEmail, userValidationPassword, contactValidation, memberValidation, companyValidation }