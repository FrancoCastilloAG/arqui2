import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsService } from './participants.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Participant } from '../database/entities/participant.entity';
import { Repository } from 'typeorm';

describe('ParticipantsService', () => {
  let service: ParticipantsService;
  let repository: Repository<Participant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantsService,
        {
          provide: getRepositoryToken(Participant),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ParticipantsService>(ParticipantsService);
    repository = module.get<Repository<Participant>>(getRepositoryToken(Participant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of participants', async () => {
      const participants = [new Participant(), new Participant()];
      jest.spyOn(repository, 'find').mockResolvedValue(participants);

      const result = await service.findAll();

      expect(result).toEqual(participants);
    });
  });

  describe('findOne', () => {
    it('should return a participant by id', async () => {
      const id = 1;
      const participant = new Participant();
      participant.id = id;
      jest.spyOn(repository, 'findOne').mockResolvedValue(participant);

      const result = await service.findOne(id);

      expect(result).toEqual(participant);
    });
  });

  describe('create', () => {
    it('should create a new participant', async () => {
      const newParticipant = new Participant();
      newParticipant.idUsuario = 2;
      newParticipant.horarioVotacion = '2024-06-25T08:00:00.000Z';

      const savedParticipant = new Participant();
      savedParticipant.id = 1;
      savedParticipant.idEleccion = newParticipant.idEleccion;
      savedParticipant.idUsuario = newParticipant.idUsuario;
      savedParticipant.horarioVotacion = newParticipant.horarioVotacion;

      jest.spyOn(repository, 'save').mockResolvedValue(savedParticipant);

      const result = await service.create(newParticipant);

      expect(result).toEqual(savedParticipant);
    });
  });

  describe('remove', () => {
    it('should remove a participant by id', async () => {
      const id = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

      await service.remove(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
