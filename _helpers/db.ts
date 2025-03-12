import { createConnection, ConnectionOptions } from 'typeorm';
import { createConnection as mysqlCreateConnection } from 'mysql2/promise'; // Using mysql2 for database creation
import { User } from '../users/user.model';

// Importing config.json using require since TypeScript has limitations on direct JSON imports
const config = require('../config.json');

export const db: any = {};

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;

  // Step 1: Connect to MySQL to check if the database exists
  const connection = await mysqlCreateConnection({
    host: host,
    port: +port, // Convert port to a number
    user: user,
    password: password,
  });

  // Step 2: Create the database if it does not exist
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  console.log(`Database "${database}" created or already exists.`);

  // Step 3: Close the connection to MySQL
  await connection.end();

  // Step 4: Create connection to MySQL using TypeORM (after the database is confirmed to exist)
  await createConnection({
    name: 'default', // Explicitly name the connection 'default'
    type: 'mysql',
    host: host,
    port: +port, // Convert port to a number
    username: user,
    password: password,
    database: database, // Now that the database exists, we can connect to it
    entities: [User], // Ensure the User entity is correctly linked
    synchronize: true, // Automatically sync the schema with the database
  });

  // Step 5: Initialize the User entity in the db object
  db.User = User;

  console.log('Database connection initialized, and tables are synchronized.');
}
