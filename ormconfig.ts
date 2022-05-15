import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';

dotenv.config();

export class OrmConfig {
  // Config TypeOrm
  getConfig(): TypeOrmModuleOptions {
    if (process.env.PROD) {
      return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: false,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migration/*{.ts,.js}'],
        subscribers: ['dist/subscriber/**/*.ts'],
        cli: {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber',
        },
        ssl: { rejectUnauthorized: false },
      };
    } else {
      return {
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DB,
        synchronize: false,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migration/*{.ts,.js}'],
        subscribers: ['dist/subscriber/**/*.ts'],
        cli: {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber',
        },
        ssl: { rejectUnauthorized: false },
      };
    }
  }
}

export default new OrmConfig().getConfig();
