import { IEntity } from '../Entity/IEntity';

export interface IGenericRepository<T extends IEntity> {
  findOneById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
