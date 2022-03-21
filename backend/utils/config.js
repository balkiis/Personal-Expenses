require('dotenv').config()
const Port = process.env.PORT
const Mongo_Uri = process.env.BD_CONNECT

module.exports = {
    Port, Mongo_Uri
}