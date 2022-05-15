const fs = require('fs');

const dotenv = require('dotenv');

dotenv.config();

let config =
  process.env.ORM_CONFIG ||
  `{"type":"postgres","url":"{DATABASE_URL}","entities":["dist/**/*.entity{.ts,.js}"],"migrations":["dist/migration/*{.ts,.js}"],"subscribers":["dist/subscriber/**/*.ts"],"cli":{"entitiesDir":"src/entity","migrationsDir":"src/migration","subscribersDir":"src/subscriber"},"synchronize":false,"ssl":{"rejectUnauthorized":false}}`;
console.log(process.env.DATABASE_URL, 'DATABASE_URL');
if (process.env.DATABASE_URL) {
  config = config.replace('{DATABASE_URL}', process.env.DATABASE_URL);
}

fs.writeFileSync('./ormconfig.json', config);
