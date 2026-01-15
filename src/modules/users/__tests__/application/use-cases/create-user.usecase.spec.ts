import { ConflictException } from '@nestjs/common';
import { CreateUserUseCase } from '@/modules/users/application/use-cases/create-user.usecase';
import { IUserRepository } from '@/modules/users/domain/repositories/user.repository';
import { IPasswordHasher } from '@/modules/shared/domain/repositories/password.hasher';
import { UsersEntity } from '@/modules/users/domain/entities/users.entity';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepo: jest.Mocked<IUserRepository>;
  let passwordHasher: jest.Mocked<IPasswordHasher>;

  beforeEach(() => {
    userRepo = {
      findByUsername: jest.fn(),
      save: jest.fn(),
    } as any;

    passwordHasher = {
      hash: jest.fn(),
      verify: jest.fn(),
    };

    useCase = new CreateUserUseCase(userRepo, passwordHasher);
  });

  it('should create user successfully', async () => {
    // arrange
    passwordHasher.hash.mockResolvedValue('hashed-password');
    userRepo.findByUsername.mockResolvedValue(null);

    const cmd = {
      username: 'john',
      password: 'strongpassword',
      fullname: 'John Doe',
      avatar: 'avatar.png',
      createdBy: 'admin',
    };

    // act
    const result = await useCase.execute(cmd);

    // assert
    expect(passwordHasher.hash).toHaveBeenCalledWith('strongpassword');
    expect(userRepo.findByUsername).toHaveBeenCalledWith('john');
    expect(userRepo.save).toHaveBeenCalledTimes(1);

    const savedUser = userRepo.save.mock.calls[0][0] as UsersEntity;
    expect(savedUser.username).toBe('john');
    expect(savedUser.password).toBe('hashed-password');

    expect(result).toBeDefined();
    expect(result.username).toBe('john');
  });

  it('should throw ConflictException if username already exists', async () => {
    // arrange
    passwordHasher.hash.mockResolvedValue('hashed-password');
    userRepo.findByUsername.mockResolvedValue({} as UsersEntity);

    const cmd = {
      username: 'john',
      password: 'strongpassword',
      fullname: 'John Doe',
      avatar: 'avatar.png',
      createdBy: 'admin',
    };

    // act + assert
    await expect(useCase.execute(cmd)).rejects.toThrow(ConflictException);

    expect(userRepo.save).not.toHaveBeenCalled();
  });
});
