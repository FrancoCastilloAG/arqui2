import { Test, TestingModule } from '@nestjs/testing';
import { ElectionsController } from './elections.controller';
import { ElectionsService } from './elections.service';
import { Election } from '../database/entities/election.entity';
import { VOTING_SERVICE_NAME } from '../vote.pb';

describe('ElectionsController', () => {
  let electionsController: ElectionsController;
  let electionsService: ElectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionsController],
      providers: [
        {
          provide: ElectionsService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    electionsController = module.get<ElectionsController>(ElectionsController);
    electionsService = module.get<ElectionsService>(ElectionsService);
  });

  describe('createElection', () => {
    it('should create an election', async () => {
      const electionData = { year: 2024, date: '2024-06-25', startTime: '08:00', endTime: '18:00' };
      const createdElection = new Election();
      createdElection.year = electionData.year;
      createdElection.date = electionData.date;
      createdElection.startTime = electionData.startTime;
      createdElection.endTime = electionData.endTime;

      jest.spyOn(electionsService, 'create').mockResolvedValue(createdElection);

      const result = await electionsController.createElection(electionData);

      expect(electionsService.create).toHaveBeenCalledWith(expect.objectContaining({
        year: electionData.year,
        date: electionData.date,
        startTime: electionData.startTime,
        endTime: electionData.endTime,
      }));
      expect(result).toBe(createdElection);
    });
  });

  describe('getElection', () => {
    it('should return an election by id', async () => {
      const electionId = 1;
      const election = new Election();

      jest.spyOn(electionsService, 'findOne').mockResolvedValue(election);

      const result = await electionsController.getElection({ id: electionId });

      expect(electionsService.findOne).toHaveBeenCalledWith(electionId);
      expect(result).toBe(election);
    });
  });

  describe('listElections', () => {
    it('should return a list of elections', async () => {
      const elections = [new Election(), new Election()];

      jest.spyOn(electionsService, 'findAll').mockResolvedValue(elections);

      const result = await electionsController.listElections();

      expect(electionsService.findAll).toHaveBeenCalled();
      expect(result).toEqual({ elections });
    });
  });
});
