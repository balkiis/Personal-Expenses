require('express-async-errors')
const express = require('express')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const helmet = require("helmet")
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const categoryRoutes = require('./routes/categoryRoutes')
const currencyRoutes = require('./routes/currencyRoutes')
const usersRoutes = require('./routes/user')
const middleware = require('./utils/middleware')
require('dotenv').config()
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))
app.use('/files', express.static('files'))
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)
app.use(middleware.userExtractor)
app.use('/api/categories', categoryRoutes)
app.use('/api/currency', currencyRoutes)
app.use('/api/users', usersRoutes)
app.use(middleware.unknownEndpoint)
const server = http.createServer(app)
server.listen(config.Port, () => {
    logger.info(`Server is running on the POST: ${config.Port}`)
})