import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../database/entities/participant.entity';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ElectionsModule } from '../elections/elections.module';

@Module({
  imports: [TypeOrmModule.forFeature([Participant]), ElectionsModule],
  providers: [ParticipantsService],
  controllers: [ParticipantsController],
})
export class ParticipantsModule {}
