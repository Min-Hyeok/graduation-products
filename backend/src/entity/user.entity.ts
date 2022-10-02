import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  userId: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 12 })
  userName: string;

  @Column({ length: 13 })
  phoneNumber: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  registerDate: Date;

  @Column()
  loginDate: Date;
}
