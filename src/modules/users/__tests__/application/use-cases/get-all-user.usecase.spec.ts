import { GetAllUserUseCase } from '@/modules/users/application/use-cases/get-all-user.usecase';
import { IUserRepository } from '@/modules/users/domain/repositories/user.repository';
import PaginationDto from '@/common/dto/pagination.dto';
import MetadataDto from '@/common/dto/metadata.dto';
import { ResponseDto } from '@/common/payload.data';

describe('GetAllUserUseCase', () => {
  let useCase: GetAllUserUseCase;
  let userRepo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepo = {
      findAll: jest.fn(),
    } as any;

    useCase = new GetAllUserUseCase(userRepo);
  });

  it('should return users with correct metadata', async () => {
    // arrange
    const pagination = new PaginationDto(0, 0);
    pagination.page = 2;
    pagination.pageSize = 5;

    const repoResult = {
      data: [
        { id: '1', username: 'john' },
        { id: '2', username: 'jane' },
        { id: '3', username: 'tom' },
        { id: '4', username: 'mary' },
        { id: '5', username: 'alex' },
      ],
      total: 12,
    };

    userRepo.findAll.mockResolvedValue(repoResult as any);

    // act
    const result = await useCase.execute(pagination);

    // assert
    expect(userRepo.findAll).toHaveBeenCalledWith({
      page: 2,
      pageSize: 5,
    });

    expect(result).toBeInstanceOf(ResponseDto);

    // data
    expect(result.data).toEqual(repoResult.data);

    // metadata
    expect(result.metadata).toBeInstanceOf(MetadataDto);
    expect(result.metadata.page).toBe(2);
    expect(result.metadata.pageSize).toBe(5);
    expect(result.metadata.totalPage).toBe(Math.ceil(12 / 5)); // = 3
  });
});
