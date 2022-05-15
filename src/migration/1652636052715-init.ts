import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1652636052715 implements MigrationInterface {
  name = 'init1652636052715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("github_user_id" bigint NOT NULL, "username" character varying(50) NOT NULL, "github_token" character varying(50), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_5b34a5b88f6f05519e6f6e7dfe7" PRIMARY KEY ("github_user_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
