import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Election {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;
}
