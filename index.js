require('dotenv').config();
// require your server and launch it
const server = require('./api/server');

if (process.env.NODE_ENV === 'development') { // on Heroku machine, an env variable is called "NODE_ENV" --> "production"
    const cors = require('cors');
    server.use(cors());
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});