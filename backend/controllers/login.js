const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../Models/user')
const { userValidationUsername, userValidationEmail, userValidationPassword } = require('../Utils/validate')
const logger = require('../Utils/logger')
const userLogin = async (request, response) => {
    const body = request.body
    let user = String.empty
    if (body.emailOrUsername.includes('@')) {
        let dataEmail = { "email": body.emailOrUsername }
        const validateEmail = userValidationEmail(dataEmail)
        if (validateEmail.error)
            return response.status(401).json({ error: validateEmail.error.message })
        user = await User.findOne({ email: body.emailOrUsername })
    }
    else {
        let dataUsername = { "username": body.emailOrUsername }
        const validateUsername = userValidationUsername(dataUsername)
        if (validateUsername.error)
            return response.status(401).json({ error: validateUsername.error.message })
        user = await User.findOne({ username: body.emailOrUsername })
    }
    let dataPass = { "password": body.password }
    const validatePassword = userValidationPassword(dataPass)
    if (validatePassword.error)
        return response.status(401).json({ error: validatePassword.error.message })
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password)
    if (!(user && passwordCorrect))
        return response.status(401).json({ error: 'Invalid username/email and/or password' })
    const userForToken = { username: user.username, id: user.id }
    logger.info("userForToken", userForToken)
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })
    logger.info("token", token)
    response.status(201).json({ token: token })
}
const checkIfStillLogin = async (request, response, next) => {
    console.log("request.user", request.user)
    if (request.user === undefined)
        return next({ name: "JsonWebTokenError", message: 'Invalid token' })
    response.status(201).json({ fullName: request.user.fName + ' ' + request.user.lName, firstName: request.user.fName, lastName: request.user.lName, email: request.user.email, username: request.user.username, id: request.user.id })
}
const userLogout = async (request, response) => {
    logger.info("--------BEFORE DELETE COOKIE | RESPONSE--------")
    logger.info("--------BEFORE DELETE COOKIE | REQUEST--------")
    response.status(201).end()
}
module.exports = { userLogin, userLogout, checkIfStillLogin }