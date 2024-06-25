import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Election } from './election.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Election, election => election.id)
  idEleccion: Election;

  @Column()
  idUsuario: number;

  @Column()
  horarioVotacion: string;
}
