export class CreateUserVO {
constructor(
    public readonly id: string,
    public username: string,
    public password: string,
    public fullname: string,
    public avatar: string,
  ) {}
}
