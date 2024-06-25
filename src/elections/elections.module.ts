import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionsService } from './elections.service';
import { ElectionsController } from './elections.controller';
import { Election } from '../database/entities/election.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Election])],
  providers: [ElectionsService],
  controllers: [ElectionsController],
  exports: [ElectionsService],
})
export class ElectionsModule {}
