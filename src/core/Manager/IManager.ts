import { IEntity } from '../Entity/IEntity';
import { IGenericRepository } from '../Repository/IGenericRepository';

export interface IManager {

  getRepository<T extends IEntity>(name: string): IGenericRepository<T>;

}