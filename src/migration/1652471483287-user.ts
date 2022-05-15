import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1652471483287 implements MigrationInterface {
  name = 'user1652471483287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users (DB_github_user_idDB_ bigint NOT NULL, DB_usernameDB_ varchar(50) NOT NULL, DB_tokenDB_ varchar(50) NOT NULL, DB_github_tokenDB_ varchar(50) NULL, UNIQUE INDEX DB_IDX_fe0bb3f6520ee0469504521e71DB_ (DB_usernameDB_), UNIQUE INDEX DB_IDX_7869db61ed722d562da1acf6d5DB_ (DB_tokenDB_), PRIMARY KEY (DB_github_user_idDB_)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX DB_IDX_7869db61ed722d562da1acf6d5DB_ ON DB_usersDB_`,
    );
    await queryRunner.query(
      `DROP INDEX DB_IDX_fe0bb3f6520ee0469504521e71DB_ ON DB_usersDB_`,
    );
    await queryRunner.query(`DROP TABLE DB_usersDB_`);
  }
}
