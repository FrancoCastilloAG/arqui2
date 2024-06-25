import { Test, TestingModule } from '@nestjs/testing';
import { VoteCountService } from './vote-count.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VoteCount } from '../database/entities/votecount.entity';
import { Repository } from 'typeorm';

describe('VoteCountService', () => {
  let service: VoteCountService;
  let repository: Repository<VoteCount>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteCountService,
        {
          provide: getRepositoryToken(VoteCount),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VoteCountService>(VoteCountService);
    repository = module.get<Repository<VoteCount>>(getRepositoryToken(VoteCount));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vote counts', async () => {
      const voteCounts = [new VoteCount(), new VoteCount()];
      jest.spyOn(repository, 'find').mockResolvedValue(voteCounts);

      const result = await service.findAll();

      expect(result).toEqual(voteCounts);
    });
  });

  describe('findOne', () => {
    it('should return a vote count by id', async () => {
      const id = 1;
      const voteCount = new VoteCount();
      voteCount.id = id;
      jest.spyOn(repository, 'findOne').mockResolvedValue(voteCount);

      const result = await service.findOne(id);

      expect(result).toEqual(voteCount);
    });
  });

  describe('create', () => {
    it('should create a new vote count', async () => {
      const newVoteCount = new VoteCount();
      newVoteCount.idLista = 2;
      newVoteCount.cantVotos = 100;

      const savedVoteCount = new VoteCount();
      savedVoteCount.id = 1;
      savedVoteCount.idEleccion = newVoteCount.idEleccion;
      savedVoteCount.idLista = newVoteCount.idLista;
      savedVoteCount.cantVotos = newVoteCount.cantVotos;

      jest.spyOn(repository, 'save').mockResolvedValue(savedVoteCount);

      const result = await service.create(newVoteCount);

      expect(result).toEqual(savedVoteCount);
    });
  });

  describe('remove', () => {
    it('should remove a vote count by id', async () => {
      const id = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

      await service.remove(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
