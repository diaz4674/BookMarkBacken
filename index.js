require('dotenv').config()

const server = require('./server.js')

const port = process.env.DB_HOST || 3300;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})