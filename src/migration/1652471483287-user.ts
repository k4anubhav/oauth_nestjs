import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1652471483287 implements MigrationInterface {
  name = 'user1652471483287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`github_user_id\` bigint NOT NULL, \`username\` varchar(50) NOT NULL, \`token\` varchar(50) NOT NULL, \`github_token\` varchar(50) NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_7869db61ed722d562da1acf6d5\` (\`token\`), PRIMARY KEY (\`github_user_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_7869db61ed722d562da1acf6d5\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
