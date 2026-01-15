import { BadRequestException } from '@nestjs/common';
import { PasswordVO } from '@/modules/users/domain/value-objects/password.vo'; 
import { IPasswordHasher } from '@/modules/shared/domain/repositories/password.hasher';

describe('PasswordVO', () => {
  let passwordHasher: jest.Mocked<IPasswordHasher>;

  beforeEach(() => {
    passwordHasher = {
      hash: jest.fn(),
      verify: jest.fn(),
    };
  });

  describe('create()', () => {
    it('should throw BadRequestException if password is too short', async () => {
      await expect(
        PasswordVO.create('1234567', passwordHasher),
      ).rejects.toThrow(BadRequestException);
    });

    it('should hash password and return PasswordVO', async () => {
      passwordHasher.hash.mockResolvedValue('hashed-password');

      const vo = await PasswordVO.create(
        'strongpassword',
        passwordHasher,
      );

      expect(passwordHasher.hash).toHaveBeenCalledWith('strongpassword');
      expect(vo).toBeInstanceOf(PasswordVO);
      expect(vo.hashedPassword).toBe('hashed-password');
    });
  });

  describe('verify()', () => {
    it('should verify password correctly', async () => {
      passwordHasher.verify.mockResolvedValue(true);

      const vo = PasswordVO.fromHashed('hashed-password');

      const result = await vo.verify('plain-password', passwordHasher);

      expect(passwordHasher.verify).toHaveBeenCalledWith(
        'plain-password',
        'hashed-password',
      );
      expect(result).toBe(true);
    });

    it('should return false if password does not match', async () => {
      passwordHasher.verify.mockResolvedValue(false);

      const vo = PasswordVO.fromHashed('hashed-password');

      const result = await vo.verify('wrong-password', passwordHasher);

      expect(result).toBe(false);
    });
  });

  describe('fromHashed()', () => {
    it('should create PasswordVO from hashed password', () => {
      const vo = PasswordVO.fromHashed('already-hashed');

      expect(vo).toBeInstanceOf(PasswordVO);
      expect(vo.hashedPassword).toBe('already-hashed');
    });
  });
});
