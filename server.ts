// import express from 'express';
import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import route from "./routes/routes";

// const app = express();
dotenv.config();

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server running on http://${process.env.HOST}:${port}`))
const server = http.createServer();

server.listen(process.env.PORT, () => {
    console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`)
})

server.on("request", (req: IncomingMessage, res: ServerResponse) => {
    route(req, res);
})