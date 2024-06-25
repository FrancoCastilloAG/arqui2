import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteCount } from '../database/entities/votecount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VoteCountService {
  constructor(
    @InjectRepository(VoteCount)
    private voteCountRepository: Repository<VoteCount>,
  ) {}

  findAll(): Promise<VoteCount[]> {
    return this.voteCountRepository.find();
  }

  findOne(id: number): Promise<VoteCount> {
    return this.voteCountRepository.findOne({
        where: { id },
      });
  }

  create(voteCount: VoteCount): Promise<VoteCount> {
    return this.voteCountRepository.save(voteCount);
  }

  async remove(id: number): Promise<void> {
    await this.voteCountRepository.delete(id);
  }
}
