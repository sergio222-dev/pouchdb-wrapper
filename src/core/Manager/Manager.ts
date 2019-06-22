import PouchDB from 'pouchdb';
import { IConfigurator } from '../Configurator/IConfigurator';
import { AbstractEntity } from '../Entity/AbstractEntity';
import { IEntity } from '../Entity/IEntity';
import { Scheme } from '../Entity/Scheme';
import { IOperation } from '../Operation/IOperation';
import { Operation } from '../Operation/Operation';
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

  public contextCollection: Map<string, PouchDB.Database> = new Map<string, PouchDB.Database>();

  private unitOfWork: IUnitOfWork;
  // @ts-ignore
  private schemes: Map<string, Scheme> = new Map<string, Scheme>();

  private constructor() {
  }

  public configure(configurator: IConfigurator) {
    this.schemes = configurator.getSchemesMap();
    const schemes: Scheme[] = configurator.getSchemes();
    schemes.forEach(
      (scheme: Scheme) => {
        const db = new PouchDB(scheme.getContextName());
        this.contextCollection.set(scheme.getContextName(), db);
      },
    );
    this.unitOfWork = new UnitOfWork(this.contextCollection);
  }

  public getRepository<T extends IEntity>(name: string) {
    if (!this.contextCollection.has(name)) {
      throw new Error(`The repository ${name} do not exists in the scheme`);
    }
    return new GenericRepository<T>(this.contextCollection.get(name), this.schemes.get(name));
  }

  public putEntity(e: IEntity) {
    this.beginTransaction();
    if (!this.isEntityInScheme(e)) {
      throw new Error(`the constructor name ${e.constructor.name} is not in the scheme configuration`);
    }

    const op: IOperation = new Operation(e, e.constructor.name, 'PUT');
    this.unitOfWork.addOperation(op);
  }

  public updateEntity(e: IEntity) {
    this.beginTransaction();
    if (!this.isEntityInScheme(e)) {
      throw new Error(`the constructor name ${e.constructor.name} is not in the scheme configuration`);
    }

    const op: IOperation = new Operation(e, e.constructor.name, 'UPDATE');
    this.unitOfWork.addOperation(op);
  }

  public deleteEntity(e: AbstractEntity) {
    this.beginTransaction();
    if (!this.isEntityInScheme(e)) {
      throw new Error(`the constructor name ${e.constructor.name} is not in the scheme configuration`);
    }

    e._deleted = true; // Delete for bulkDocs
    const op: IOperation = new Operation(e, e.constructor.name, 'DELETE');
    this.unitOfWork.addOperation(op);
  }

  public async flush() {
    await this.unitOfWork.commit();
  }

  private beginTransaction() {
    if (!this.unitOfWork.isBegin()) {
      this.unitOfWork.beginTransaction();
    }
  }

  private isEntityInScheme(e: IEntity): boolean {
    return !!this.schemes.get(e.constructor.name);
  }

}