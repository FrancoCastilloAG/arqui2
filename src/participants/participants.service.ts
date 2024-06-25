import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '../database/entities/participant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
  ) {}

  findAll(): Promise<Participant[]> {
    return this.participantsRepository.find();
  }

  findOne(id: number): Promise<Participant> {
    return this.participantsRepository.findOne({
        where: { id },
      });
  }

  create(participant: Participant): Promise<Participant> {
    return this.participantsRepository.save(participant);
  }

  async remove(id: number): Promise<void> {
    await this.participantsRepository.delete(id);
  }
}
