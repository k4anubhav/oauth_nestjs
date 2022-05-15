import { Entity, Column } from 'typeorm';

// TypeORM Entity for User
@Entity('users')
export class User {
  @Column({
    type: 'bigint',
    primary: true,
  })
  github_user_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  github_token: string;
}
