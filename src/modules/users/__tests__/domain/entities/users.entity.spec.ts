import { UsersEntity } from "@/modules/users/domain/entities/users.entity";

describe('UsersEntity', () => {
  describe('create()', () => {

    it('should create user entity successfully', () => {
      const user = UsersEntity.create(
        'john_doe',
        'hashed-password',
        'John Doe',
        'avatar.png',
        'system',
      );

      expect(user).toBeInstanceOf(UsersEntity);

      // Domain data
      expect(user.id).toBeDefined();
      expect(user.username).toBe('john_doe');
      expect(user.password).toBe('hashed-password');
      expect(user.fullname).toBe('John Doe');
      expect(user.avatar).toBe('avatar.png');

      // BaseEntity
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.createdBy).toBe('system');
      expect(user.updatedAt).toBeNull();
      expect(user.updatedBy).toBeNull();
    });

  });
});
