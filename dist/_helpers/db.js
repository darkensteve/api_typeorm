"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
const promise_1 = require("mysql2/promise"); // Using mysql2 for database creation
const user_model_1 = require("../users/user.model");
// Importing config.json using require since TypeScript has limitations on direct JSON imports
const config = require('../config.json');
exports.db = {};
initialize();
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        const { host, port, user, password, database } = config.database;
        // Step 1: Connect to MySQL to check if the database exists
        const connection = yield (0, promise_1.createConnection)({
            host: host,
            port: +port,
            user: user,
            password: password,
        });
        // Step 2: Create the database if it does not exist
        yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        console.log(`Database "${database}" created or already exists.`);
        // Step 3: Close the connection to MySQL
        yield connection.end();
        // Step 4: Create connection to MySQL using TypeORM (after the database is confirmed to exist)
        yield (0, typeorm_1.createConnection)({
            type: 'mysql',
            host: host,
            port: +port,
            username: user,
            password: password,
            database: database,
            entities: [user_model_1.User],
            synchronize: true, // Automatically sync the schema with the database
        });
        // Step 5: Initialize the User entity in the db object
        exports.db.User = user_model_1.User;
        console.log('Database connection initialized, and tables are synchronized.');
    });
}
