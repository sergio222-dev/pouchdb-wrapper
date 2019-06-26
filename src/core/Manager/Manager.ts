import PouchDB from 'pouchdb';
import { IConfigurator } from '../Configurator/IConfigurator';
import { AbstractEntity } from '../Entity/AbstractEntity';
import { IEntity } from '../Entity/IEntity';
import { Scheme } from '../Entity/Scheme';
import { IOperation } from '../Operation/IOperation';
import { Operation, OperationType } from '../Operation/Operation';
import { GenericRepository } from '../Repository/GenericRepository';
import { IUnitOfWork } from '../UnitOfWork/IUnitOfWork';
import { UnitOfWork } from '../UnitOfWork/UnitOfWork';
import { IManager } from './IManager';

export class Manager implements IManager {

  public static getInstance() {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }

  private static instance: Manager;

  // public contextCollection: Map<string, PouchDB.Database> = new Map<string, PouchDB.Database>();

  private unitOfWork: IUnitOfWork;
  // @ts-ignore
  private schemes: Map<string, Scheme> = new Map<string, Scheme>();

  private constructor() {
  }

  public configure(configurator: IConfigurator) {
    const contextCollection: Map<string, PouchDB.Database> = new Map<string, PouchDB.Database>();
    const schemes: Scheme[] = configurator.getSchemes();

    this.schemes = configurator.getSchemesMap();

    schemes.forEach(
      (scheme: Scheme) => {
        const db = new PouchDB(scheme.getContextName(), {
          adapter: 'idb',
          auto_compaction: true,
        });
        contextCollection.set(scheme.getContextName(), db);
      },
    );

    this.unitOfWork = new UnitOfWork(contextCollection);
  }

  public getRepository<T extends IEntity>(contextName: string) {
    if (!this.isContextNameInScheme(contextName)) {
      throw new Error(`The repository ${contextName} do not exists in the scheme`);
    }

    const contextCollection = this.unitOfWork.contextCollection;
    const context = contextCollection.get(contextName);
    const scheme = this.schemes.get(contextName);

    return new GenericRepository<T>(context, scheme);
  }

  public putEntity(entity: IEntity) {
    this.addOperation(entity, 'PUT');
  }

  public updateEntity(entity: IEntity) {
    this.addOperation(entity, 'UPDATE');
  }

  public deleteEntity(entity: AbstractEntity) {
    this.addOperation(entity, 'DELETE');
  }

  public async flush() {
    await this.unitOfWork.commit();
  }

  public async destroy(contextName: string): Promise<void> {
    if (!this.isContextNameInScheme(contextName)) {
      throw new Error(`The context ${contextName} do not exists in the scheme`);
    }
    const contextCollection = this.unitOfWork.contextCollection;
    const context = contextCollection.get(contextName);
    await context.destroy();
  }

  public async destroyAll(): Promise<void> {
    const contextCollection = this.unitOfWork.contextCollection;
    await contextCollection.forEach(
      async (c: PouchDB.Database) => {
        await c.destroy();
      },
    );
  }

  private beginTransaction() {
    if (!this.unitOfWork.isBegin()) {
      this.unitOfWork.beginTransaction();
    }
  }

  private addOperation(entity: IEntity, operationType: OperationType) {
    const constructName: string = entity.constructor.name;
    if (!this.isContextNameInScheme(constructName)) {
      throw new Error(`the constructor name ${constructName} is not in the scheme configuration`);
    }

    this.beginTransaction();
    if (operationType === 'DELETE') {
      entity._deleted = true;
    }
    const op: IOperation = new Operation(entity, operationType);
    this.unitOfWork.addOperation(op);
  }

  private isContextNameInScheme(contextName: string): boolean {
    return !!this.schemes.get(contextName);
  }


}