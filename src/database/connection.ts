import knex from 'knex';
import path from 'path';

// Knex is a query builder, that allow us write scripts with javascript
// and can be integrate with most of databases languages

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});

export default connection;