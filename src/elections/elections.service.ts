import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Election } from '../database/entities/election.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ElectionsService {
  constructor(
    @InjectRepository(Election)
    private electionsRepository: Repository<Election>,
  ) {}

  findAll(): Promise<Election[]> {
    return this.electionsRepository.find();
  }

  findOne(id: number): Promise<Election> {
    return this.electionsRepository.findOne({
      where: { id },
    });
  }

  create(election: Election): Promise<Election> {
    return this.electionsRepository.save(election);
  }

  async remove(id: number): Promise<void> {
    await this.electionsRepository.delete(id);
  }
}
