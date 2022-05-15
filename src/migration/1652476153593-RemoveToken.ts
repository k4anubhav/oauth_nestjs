import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveToken1652476153593 implements MigrationInterface {
  name = 'RemoveToken1652476153593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX DB_IDX_7869db61ed722d562da1acf6d5DB_ ON DB_usersDB_`,
    );
    await queryRunner.query(`ALTER TABLE DB_usersDB_ DROP COLUMN DB_tokenDB_`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE DB_usersDB_ ADD DB_tokenDB_ varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX DB_IDX_7869db61ed722d562da1acf6d5DB_ ON DB_usersDB_ (DB_tokenDB_)`,
    );
  }
}
