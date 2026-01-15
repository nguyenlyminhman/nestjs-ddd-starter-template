

export abstract class BaseEntity {
  protected constructor(
    public readonly createdAt: Date | null,
    public readonly createdBy: string | null,
    public updatedAt: Date | null,
    public updatedBy: string | null,
  ) {}

  protected update(updatedBy: string) {
    this.updatedAt = new Date();
    this.updatedBy = updatedBy;
  }
}
