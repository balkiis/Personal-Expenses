const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../Models/user')
const requestLogger = (request, response, next) => {
    logger.info('----------Request Logger----------')
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('----------------------------------')
    next()
}
const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken)
            return response.status(403).json({ error: 'Authentication: Token missing or invalid' })
        if (!token || !decodedToken.id)
            return response.status(403).json({ error: 'Authentication: Token missing or invalid' })
        request.user = await User.findById(decodedToken.id)
    }
    next()
}
const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: '404 - Not Found: Unknown End Point' })
}
module.exports = { requestLogger, unknownEndpoint, errorHandler, userExtractor }