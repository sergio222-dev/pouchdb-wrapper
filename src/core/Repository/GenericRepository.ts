import { IEntity } from '../Entity/IEntity';
import { Scheme } from '../Entity/Scheme';
import { IGenericRepository } from './IGenericRepository';

export class GenericRepository<T extends IEntity> implements IGenericRepository<T> {

  private readonly context: PouchDB.Database;
  private scheme: Scheme;

  public constructor(context: PouchDB.Database, scheme: Scheme) {
    this.context = context;
    this.scheme = scheme;
  }

  public async findAll(): Promise<T[]> {
    return [];
  }

  public async findOneById(id: string): Promise<T> {
    const result: any = await this.context.get(id);
    const fields: string[] = this.scheme.getFields();
    const entityConstructor: any = this.scheme.getConstructor();

    const entity: any = new entityConstructor(result._id, result._rev);
    fields.forEach(
      (f: string) => {
        entity[f] = result[f];
      }
    );

    return entity as T;
  }
  
}