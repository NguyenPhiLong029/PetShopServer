import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true
  })
  _createdBy: string;

  @Column({
    nullable: true
  })
  _updatedBy: string;

  @CreateDateColumn()
  _createdDate: number;

  @CreateDateColumn({
    nullable: true
  })
  _updatedDate: number;
}
