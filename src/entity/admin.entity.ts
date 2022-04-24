import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: '50', nullable: false, unique: true })
  username: string;
  @Column({ type: 'varchar', length: '100', nullable: false })
  password: string;
  @Column({ type: 'varchar', length: '100', nullable: false, unique: true })
  email: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
