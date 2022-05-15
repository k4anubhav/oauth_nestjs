import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveToken1652476153593 implements MigrationInterface {
  name = 'RemoveToken1652476153593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_7869db61ed722d562da1acf6d5\` ON \`users\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`token\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`token\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_7869db61ed722d562da1acf6d5\` ON \`users\` (\`token\`)`,
    );
  }
}
