import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionsModule } from './elections/elections.module';
import { VoteCountModule } from './vote-count/vote-count.module';
import { ParticipantsModule } from './participants/participants.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),    
    ElectionsModule,
    VoteCountModule,
    ParticipantsModule,
  ],
})
export class AppModule {}
