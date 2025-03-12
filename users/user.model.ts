import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;  // Add the non-null assertion operator (!)

  @Column()
  email!: string;  // Add the non-null assertion operator (!)

  @Column()
  passwordHash!: string;  // Add the non-null assertion operator (!)

  @Column()
  title!: string;  // Add the non-null assertion operator (!)

  @Column()
  firstName!: string;  // Add the non-null assertion operator (!)

  @Column()
  lastName!: string;  // Add the non-null assertion operator (!)

  @Column()
  role!: string;  // Add the non-null assertion operator (!)
}
