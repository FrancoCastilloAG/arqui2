import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Election } from './election.entity';

@Entity()
export class VoteCount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Election, election => election.id)
  idEleccion: Election;

  @Column()
  idLista: number;

  @Column()
  cantVotos: number;
}
