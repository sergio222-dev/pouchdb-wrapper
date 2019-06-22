import { IEntity } from './IEntity';

export abstract class AbstractEntity implements IEntity{
  // tslint:disable:variable-name
  public _id: string;
  public _deleted: boolean = false;
  public _rev: string;

  constructor(id: string, rev: string = '') {
    this._id = id;
    this._rev = rev;
  }
}

export interface IAbstractEntityConstructor {
  // tslint:disable
  new (id: string, rev?: string): AbstractEntity
}