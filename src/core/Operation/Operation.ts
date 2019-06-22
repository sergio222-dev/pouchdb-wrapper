import { IEntity } from '../Entity/IEntity';
import { IOperation } from './IOperation';

export type OperationType = 'PUT' | 'FETCH' | 'DELETE' | 'UPDATE';

export class Operation implements IOperation{
  private readonly entity: IEntity;
  private readonly contextName: string;
  private readonly operationType: OperationType;

  constructor(entity: IEntity, contextName: string, operationType: OperationType) {
    this.entity = entity;
    this.contextName = contextName;
    this.operationType = operationType;
  }

  public getOperationType() {
    return this.operationType;
  }

  public getEntity() {
    return this.entity;
  }

  public getContextName() {
    return this.contextName;
  }
}