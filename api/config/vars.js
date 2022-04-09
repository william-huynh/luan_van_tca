require("dotenv").config();

module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    protocol: process.env.NODE_ENV === 'development' ? "http" : "https"
}