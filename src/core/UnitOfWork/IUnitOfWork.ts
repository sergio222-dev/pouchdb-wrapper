import { IOperation } from '../Operation/IOperation';

export interface IUnitOfWork {
  contextCollection: Map<string, PouchDB.Database>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  beginTransaction(): void;
  addOperation(operation: IOperation): boolean;
  isBegin(): boolean;
  removeContext(contextName: string): Promise<void>;
  removeAllContext(): Promise<void>;
}