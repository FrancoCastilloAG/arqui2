import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VoteCountService } from './vote-count.service';
import { VoteCount } from '../database/entities/votecount.entity';
import { GrpcMethod } from '@nestjs/microservices';
import { VOTING_SERVICE_NAME } from 'src/vote.pb';
import { ElectionsService } from '../elections/elections.service';
import { VoteCountList } from './votecount-list.interfaces'

@Controller()
export class VoteCountController {
  constructor(
    private readonly voteCountService: VoteCountService,
    private readonly electionsService: ElectionsService,
  ) {}

  @GrpcMethod(VOTING_SERVICE_NAME, 'CreateVoteCount')
  async createVoteCount(data: { election: number, idLista: number, cantVotos: number }): Promise<VoteCount> {
    console.log(data)
    const election = await this.electionsService.findOne(data.election);
    console.log(data.election)
    if (!election) {
      throw new Error('Election not found');
    }

    const voteCount = new VoteCount();
    voteCount.idEleccion = election;
    voteCount.idLista = data.idLista;
    voteCount.cantVotos = data.cantVotos;
    console.log(data.idLista)
    return this.voteCountService.create(voteCount);
  }

  @GrpcMethod(VOTING_SERVICE_NAME, 'GetVoteCount')
  getVoteCount(data: { id: number }): Promise<VoteCount> {
    return this.voteCountService.findOne(data.id);
  }

  @GrpcMethod(VOTING_SERVICE_NAME, 'ListVoteCounts')
  async listVoteCounts(): Promise<VoteCountList> {
    const votes = await this.voteCountService.findAll();
    return { votes };
  }
}
