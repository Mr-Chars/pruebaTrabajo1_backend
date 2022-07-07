import express from 'express';
import { SERVER_PORT } from '../environment';

var http = require('http');

export default class Server {

    public app: express.Application;
    public port: number;
    public httpServer;

    public constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.port = SERVER_PORT;
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, Number(callback));
    }

}