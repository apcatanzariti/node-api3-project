require('dotenv').config();

const express = require('express');

// require your server and launch it
const server = require('./api/server');

server.use(express.json());

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});