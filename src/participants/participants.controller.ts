import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Participant } from '../database/entities/participant.entity';
import { ElectionsService } from '../elections/elections.service';
import { VOTING_SERVICE_NAME } from '../vote.pb';
import { ParticipantList } from './participants-list.interface'

@Controller()
export class ParticipantsController {
  constructor(
    private readonly participantsService: ParticipantsService,
    private readonly electionsService: ElectionsService,
  ) {}
  
  @GrpcMethod(VOTING_SERVICE_NAME, 'CreateParticipant')
  async createParticipant(data: { idEleccion: number, idUsuario: number, horarioVotacion: string }): Promise<Participant> {
    console.log(data)
    const election = await this.electionsService.findOne(data.idEleccion);

    if (!election) {
      throw new Error('Election not found');
    }

    const participant = new Participant();
    participant.idEleccion = election;
    participant.idUsuario = data.idUsuario;
    participant.horarioVotacion = data.horarioVotacion;

    return this.participantsService.create(participant);
  }

  @GrpcMethod(VOTING_SERVICE_NAME, 'GetParticipant')
  getParticipant(data: { id: number }): Promise<Participant> {
    return this.participantsService.findOne(data.id);
  }

  @GrpcMethod(VOTING_SERVICE_NAME, 'ListParticipants')
  async listParticipants(): Promise<ParticipantList> {
    const participants = await this.participantsService.findAll();
    return { participants };
  }
}
