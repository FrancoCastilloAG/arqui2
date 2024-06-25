import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteCount } from '../database/entities/votecount.entity';
import { VoteCountService } from './vote-count.service';
import { VoteCountController } from './vote-count.controller';
import { ElectionsModule } from '../elections/elections.module';

@Module({
  imports: [TypeOrmModule.forFeature([VoteCount]), ElectionsModule], 
  providers: [VoteCountService],
  controllers: [VoteCountController],
})
export class VoteCountModule {}
