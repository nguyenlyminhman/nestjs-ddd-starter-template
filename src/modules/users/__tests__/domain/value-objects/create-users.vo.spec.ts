import { CreateUserVO } from "@/modules/users/domain/value-objects/create-users.vo";

describe('CreateUserVO', () => {
  it('should create a CreateUserVO instance with correct values', () => {
    const vo = new CreateUserVO(
      'user-1',
      'john_doe',
      'secret123',
      'John Doe',
      'avatar.png',
    );

    expect(vo).toBeDefined();
    expect(vo.id).toBe('user-1');
    expect(vo.username).toBe('john_doe');
    expect(vo.password).toBe('secret123');
    expect(vo.fullname).toBe('John Doe');
    expect(vo.avatar).toBe('avatar.png');
  });

  describe('CreateUserVO', () => {
    it('should create CreateUserVO correctly', () => {
      const vo = new CreateUserVO(
        'user-1',
        'john',
        'pass',
        'John',
        'avatar.png',
      );

      expect(vo.id).toBe('user-1');
    });
  });
});
