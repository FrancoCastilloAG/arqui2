import { Test, TestingModule } from '@nestjs/testing';
import { ElectionsService } from './elections.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Election } from '../database/entities/election.entity';
import { Repository } from 'typeorm';

describe('ElectionsService', () => {
  let service: ElectionsService;
  let repository: Repository<Election>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElectionsService,
        {
          provide: getRepositoryToken(Election),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ElectionsService>(ElectionsService);
    repository = module.get<Repository<Election>>(getRepositoryToken(Election));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of elections', async () => {
      const elections = [new Election(), new Election()];
      jest.spyOn(repository, 'find').mockResolvedValue(elections);

      const result = await service.findAll();

      expect(result).toEqual(elections);
    });
  });

  describe('findOne', () => {
    it('should return an election by id', async () => {
      const id = 1;
      const election = new Election();
      election.id = id;
      jest.spyOn(repository, 'findOne').mockResolvedValue(election);

      const result = await service.findOne(id);

      expect(result).toEqual(election);
    });
  });

  describe('create', () => {
    it('should create a new election', async () => {
      const newElection = new Election();
      newElection.year = 2024;
      newElection.date = '2024-06-25';
      newElection.startTime = '08:00:00';
      newElection.endTime = '18:00:00';

      const savedElection = new Election();
      savedElection.id = 1;
      savedElection.year = newElection.year;
      savedElection.date = newElection.date;
      savedElection.startTime = newElection.startTime;
      savedElection.endTime = newElection.endTime;

      jest.spyOn(repository, 'save').mockResolvedValue(savedElection);

      const result = await service.create(newElection);

      expect(result).toEqual(savedElection);
    });
  });

  describe('remove', () => {
    it('should remove an election by id', async () => {
      const id = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

      await service.remove(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
