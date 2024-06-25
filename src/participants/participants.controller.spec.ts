import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { ElectionsService } from '../elections/elections.service';
import { Participant } from '../database/entities/participant.entity';
import { VOTING_SERVICE_NAME } from '../vote.pb';
import { Election } from '../database/entities/election.entity';

describe('ParticipantsController', () => {
  let participantsController: ParticipantsController;
  let participantsService: ParticipantsService;
  let electionsService: ElectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantsController],
      providers: [
        {
          provide: ParticipantsService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: ElectionsService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    participantsController = module.get<ParticipantsController>(ParticipantsController);
    participantsService = module.get<ParticipantsService>(ParticipantsService);
    electionsService = module.get<ElectionsService>(ElectionsService);
  });

  describe('createParticipant', () => {
    it('should create a participant', async () => {
      const participantData = { idEleccion: 1, idUsuario: 2, horarioVotacion: '10:00' };
      const election = { id: 1, name: 'Election 1', year: 2024, date: 'date', startTime: '08:00', endTime: '18:00' };
      const createdParticipant = new Participant();
      const newelection = new Election();
      newelection.date = election.date;
      newelection.year = election.year;
      newelection.startTime = election.startTime;
      newelection.endTime = election.endTime;

      jest.spyOn(electionsService, 'findOne').mockResolvedValue(newelection);
      jest.spyOn(participantsService, 'create').mockResolvedValue(createdParticipant);

      const result = await participantsController.createParticipant(participantData);

      expect(electionsService.findOne).toHaveBeenCalledWith(participantData.idEleccion);
      expect(participantsService.create).toHaveBeenCalledWith(expect.objectContaining({
        idEleccion: election,
        idUsuario: participantData.idUsuario,
        horarioVotacion: participantData.horarioVotacion,
      }));
      expect(result).toBe(createdParticipant);
    });

    it('should throw an error if election not found', async () => {
      const participantData = { idEleccion: 1, idUsuario: 2, horarioVotacion: '10:00' };

      jest.spyOn(electionsService, 'findOne').mockResolvedValue(null);

      await expect(participantsController.createParticipant(participantData)).rejects.toThrow('Election not found');
    });
  });

  describe('getParticipant', () => {
    it('should return a participant by id', async () => {
      const participantId = 1;
      const participant = new Participant();

      jest.spyOn(participantsService, 'findOne').mockResolvedValue(participant);

      const result = await participantsController.getParticipant({ id: participantId });

      expect(participantsService.findOne).toHaveBeenCalledWith(participantId);
      expect(result).toBe(participant);
    });
  });

  describe('listParticipants', () => {
    it('should return a list of participants', async () => {
      const participants = [new Participant(), new Participant()];

      jest.spyOn(participantsService, 'findAll').mockResolvedValue(participants);

      const result = await participantsController.listParticipants();

      expect(participantsService.findAll).toHaveBeenCalled();
      expect(result).toEqual({ participants });
    });
  });
});
