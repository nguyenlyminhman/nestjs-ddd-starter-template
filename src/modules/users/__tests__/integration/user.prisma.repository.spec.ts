import { Test, TestingModule } from '@nestjs/testing';
import { UserPrismaRepository } from '../../infrastructure/user.prisma.repository';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import PaginationDto from 'src/common/dto/pagination.dto';
import { randomUUID } from 'crypto';

describe('UserPrismaRepository (integration)', () => {
  let repo: UserPrismaRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UserPrismaRepository,
      ],
    }).compile();

    repo = module.get(UserPrismaRepository);
    prisma = module.get(PrismaService);

    await prisma.$connect();
  });

  afterEach(async () => {
    await prisma.users.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return paginated users', async () => {
    await prisma.users.createMany({
      data: [
        {
          id: randomUUID(),
          username: 'u1',
          password: '123456789',
          fullname: 'U1',
          avatar: '',
          created_at: new Date(),
          created_by: 'system',
        },
        {
          id: randomUUID(),
          username: 'u2',
          password: '123456789',
          fullname: 'U2',
          avatar: '',
          created_at: new Date(),
          created_by: 'system',
        },
      ],
    });

    const pagination = new PaginationDto(0, 0);
    pagination.page = 1;
    pagination.pageSize = 2;

    const rs: any = await repo.findAll(pagination);

    expect(rs.total).toBe(2);
    expect(rs.data.length).toBe(2);
    expect(rs.data[0].password).toBeUndefined(); // omit password
  });

  it('should save and find user by id', async () => {
    const _id = randomUUID();
    // arrange
    await prisma.users.create({
      data: {
        id: _id,
        username: 'john',
        password: 'hashed',
        fullname: 'John Doe',
        avatar: 'avatar.png',
        created_at: new Date(),
        created_by: 'system',
      },
    });

    // act
    const user = await repo.findById(_id);

    // assert
    expect(user).not.toBeNull();
    expect(user!.id).toBe(_id);
    expect(user!.username).toBe('john');
  });

  it('should find user by username', async () => {
    const _id = randomUUID();
    await prisma.users.create({
      data: {
        id: _id,
        username: 'alice',
        password: 'hashed',
        fullname: 'Alice',
        avatar: 'a.png',
        created_at: new Date(),
        created_by: 'system',
      },
    });

    const user = await repo.findByUsername('alice');

    expect(user).not.toBeNull();
    expect(user!.username).toBe('alice');
    expect(user!.password).toBe('hashed');
  });

  it('should return null if user not found', async () => {
    const id = randomUUID()
    const user = await repo.findById(id);
    expect(user).toBeNull();
  });

  it('should save user entity', async () => {
    const _id = randomUUID();
    const entity: any = {
      id: _id,
      username: 'save-user',
      password: 'hashed',
      fullname: 'Save User',
      avatar: '',
      createdAt: new Date(),
      createdBy: 'system',
    };

    await repo.save(entity);

    const saved = await prisma.users.findUnique({
      where: { id: _id },
    });

    expect(saved).not.toBeNull();
    expect(saved!.username).toBe('save-user');
  });
});
