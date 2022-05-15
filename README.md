# Ne~~x~~stJs Sample Project

## Setup

create .env file at root of project

```
GITHUB_OAUTH_CLIENT_ID=xxxxxxxxxxxx
GITHUB_OAUTH_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx
JWT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxx
SCOPE=repo
```

At project root directory, run:

```bash
$ npm install
```

create or update `ormconfig.json` file at root of project

```json
{
  "type": "postgres",
  "url": "{DATABASE_URL}",
  "entities": [
    "dist/**/*.entity{.ts,.js}"
  ],
  "migrations": [
    "dist/migration/*{.ts,.js}"
  ],
  "subscribers": [
    "dist/subscriber/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  },
  "synchronize": false,
  "ssl": {
    "rejectUnauthorized": false
  }
}
```

## Start server

```bash
$ npm run start:dev
```
