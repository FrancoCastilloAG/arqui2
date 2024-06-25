import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ElectionsService } from './elections.service';
import { Election } from '../database/entities/election.entity';
import { VOTING_SERVICE_NAME } from '../vote.pb';
import { GrpcMethod } from '@nestjs/microservices';
import { ElectionList } from './elections-list.interfaces';

@Controller()
export class ElectionsController {
  constructor(private readonly electionsService: ElectionsService) {}

  @GrpcMethod(VOTING_SERVICE_NAME, 'CreateElection')
  createElection(data: { year: number, date: string, startTime: string, endTime: string }): Promise<Election> {
    console.log(data)
    const election = new Election();
    election.year = data.year;
    election.date = data.date;
    election.startTime = data.startTime;
    election.endTime = data.endTime;
    console.log(data.endTime)
    return this.electionsService.create(election);
  }

  @GrpcMethod(VOTING_SERVICE_NAME, 'GetElection')
  getElection(data: { id: number }): Promise<Election> {
    return this.electionsService.findOne(data.id);
  }

  @GrpcMethod(VOTING_SERVICE_NAME, 'ListElections')
  async listElections(): Promise<ElectionList> {
    const elections = await this.electionsService.findAll();
    return { elections };
  }
}
