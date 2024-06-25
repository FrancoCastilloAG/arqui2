import { Test, TestingModule } from '@nestjs/testing';
import { VoteCountController } from './vote-count.controller';
import { VoteCountService } from './vote-count.service';
import { ElectionsService } from '../elections/elections.service';
import { VoteCount } from '../database/entities/votecount.entity';
import { VOTING_SERVICE_NAME } from 'src/vote.pb';
import { Election } from '../database/entities/election.entity';

describe('VoteCountController', () => {
  let voteCountController: VoteCountController;
  let voteCountService: VoteCountService;
  let electionsService: ElectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoteCountController],
      providers: [
        {
          provide: VoteCountService,
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

    voteCountController = module.get<VoteCountController>(VoteCountController);
    voteCountService = module.get<VoteCountService>(VoteCountService);
    electionsService = module.get<ElectionsService>(ElectionsService);
  });

  describe('createVoteCount', () => {
    it('should create a vote count', async () => {
      const voteCountData = {
        election: 1,
        idLista: 2,
        cantVotos: 100,
        idEleccion: 2,
      };
      const election = {
        id: 1,
        name: 'Election 1',
        year: 2024,
        date: 'date',
        startTime: '08:00',
        endTime: '18:00',
      }; // Include all required properties
      const createdVoteCount = new VoteCount();
      // createdVoteCount.cantVotos = voteCountData.cantVotos;
      // createdVoteCount.idLista = voteCountData.idLista;
      // createdVoteCount.idEleccion = voteCountData.idEleccion;
      const newelection = new Election();
      newelection.date = election.date;
      newelection.year = election.year;
      newelection.startTime = election.startTime;
      newelection.endTime = election.endTime;

      jest.spyOn(electionsService, 'findOne').mockResolvedValue(newelection);
      jest
        .spyOn(voteCountService, 'create')
        .mockResolvedValue(createdVoteCount);

      const result = await voteCountController.createVoteCount(voteCountData);

      expect(electionsService.findOne).toHaveBeenCalledWith(
        voteCountData.election,
      );
      expect(voteCountService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          idEleccion: election,
          idLista: voteCountData.idLista,
          cantVotos: voteCountData.cantVotos,
        }),
      );
      expect(result).toBe(createdVoteCount);
    });

    it('should throw an error if election not found', async () => {
      const voteCountData = { election: 1, idLista: 2, cantVotos: 100 };

      jest.spyOn(electionsService, 'findOne').mockResolvedValue(null);

      await expect(
        voteCountController.createVoteCount(voteCountData),
      ).rejects.toThrow('Election not found');
    });
  });

  describe('getVoteCount', () => {
    it('should return a vote count by id', async () => {
      const voteCountId = 1;
      const voteCount = new VoteCount();

      jest.spyOn(voteCountService, 'findOne').mockResolvedValue(voteCount);

      const result = await voteCountController.getVoteCount({
        id: voteCountId,
      });

      expect(voteCountService.findOne).toHaveBeenCalledWith(voteCountId);
      expect(result).toBe(voteCount);
    });
  });

  describe('listVoteCounts', () => {
    it('should return a list of vote counts', async () => {
      const voteCounts = [new VoteCount(), new VoteCount()];

      jest.spyOn(voteCountService, 'findAll').mockResolvedValue(voteCounts);

      const result = await voteCountController.listVoteCounts();

      expect(voteCountService.findAll).toHaveBeenCalled();
      expect(result).toEqual({ votes: voteCounts });
    });
  });
});
