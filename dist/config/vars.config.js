"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_SOURCES = void 0;
const environment_1 = require("../environment");
exports.DATA_SOURCES = {
    mySqlDataSource: {
        DB_HOST: environment_1.MY_SQL_DB_HOST,
        DB_USER: environment_1.MY_SQL_DB_USER,
        DB_PASSWORD: environment_1.MY_SQL_DB_PASSWORD,
        DB_PORT: environment_1.MY_SQL_DB_PORT,
        DB_DATABASE: environment_1.MY_SQL_DB_DATABASE,
        DB_CONNECTION_LIMIT: environment_1.MY_SQL_DB_CONNECTION_LIMIT ? parseInt(environment_1.MY_SQL_DB_CONNECTION_LIMIT) : 4,
    }
};
