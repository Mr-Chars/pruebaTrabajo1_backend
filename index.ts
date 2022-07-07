import Server from './class/server';
import router from './routes/route_main';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as MySQLConnector from './class/dbConfig';

const server = new Server();

// create database pool
MySQLConnector.init();

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de servicios
server.app.use('/', router);


server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
