import { IConfigurator } from '../Configurator/IConfigurator';
import { IEntity } from '../Entity/IEntity';
import { IGenericRepository } from '../Repository/IGenericRepository';

export interface IManager {

  getRepository<T extends IEntity>(name: string): IGenericRepository<T>;
  putEntity(e: IEntity): void;
  updateEntity(e: IEntity): void;
  deleteEntity(e:IEntity): void;
  flush(): Promise<void>;
  configure(cfg: IConfigurator): void;
  destroy(dbName: string): Promise<void>;
  destroyAll(): Promise<void>;
}