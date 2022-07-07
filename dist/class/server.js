"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../environment");
var http = require('http');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = http.createServer(this.app);
        this.port = environment_1.SERVER_PORT;
    }
    start(callback) {
        this.httpServer.listen(this.port, Number(callback));
    }
}
exports.default = Server;
