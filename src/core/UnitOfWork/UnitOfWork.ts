import { IEntity } from '../Entity/IEntity';
import { IOperation } from '../Operation/IOperation';
import { OperationType } from '../Operation/Operation';
import { IUnitOfWork } from './IUnitOfWork';

export class UnitOfWork implements IUnitOfWork {
  private contextCollection: Map<string, PouchDB.Database>;
  private isActive: boolean = false;
  private operations: IOperation[] = [];

  constructor(contextCollection: Map<string, PouchDB.Database>) {
    this.contextCollection = contextCollection;
  }

  public isBegin() {
    return this.isActive;
  }

  public addOperation(operation: IOperation): boolean {
    if (!this.isActive) {
      return false;
    }
    this.operations.push(operation);
    return true;
  }

  public beginTransaction() {
    this.isActive = true;
  }

  public async commit() {
    if (!this.isActive) {
      throw new Error('the transaction is not active');
    }

    /**
     * PUT OPERATIONS
     */
    const putOperations = this.getAllOperations('PUT');

    // Separate operations by context
    const contextPutOperations = this.mapContextOperations(putOperations);

    // Bulk
    await contextPutOperations.forEach(
      async (operations: IOperation[], key: string) => {
        const ctx = this.contextCollection.get(key);
        const bulk: IEntity[] = operations.map((o: IOperation) => o.getEntity());
        const result = await ctx.bulkDocs(bulk);
        console.log('result from Put bulk', result);
      });

    /**
     * UPDATE OPERATION
     */
    const updateOperations = this.getAllOperations('UPDATE');

    // Separate operations by context
    const contextUpdateOperations = this.mapContextOperations(updateOperations);

    // Bulk
    await contextUpdateOperations.forEach(
      async (operations: IOperation[], key: string) => {
        const ctx = this.contextCollection.get(key);
        const bulk: IEntity[] = operations.map((o: IOperation) => o.getEntity());
        console.log(`will update the entity with id ${bulk[0]._id}`);
        const result = await ctx.bulkDocs(bulk);
        console.log('result from Update bulk', result);
      },
    );

    /**
     * DELETE OPERATION
     */
    const deleteOperations = this.getAllOperations('DELETE');

    // Separate operations by context
    const contextDeleteOperations = this.mapContextOperations(deleteOperations);

    // Bulk
    await contextDeleteOperations.forEach(
      async (operations: IOperation[], key: string) => {
        const ctx = this.contextCollection.get(key);
        const bulk: IEntity[] = operations.map((o: IOperation) => o.getEntity());
        const result = await ctx.bulkDocs(bulk);
        console.log('result from delete bulk', result);
      },
    );

    this.operations = [];
  }

  public rollback() {
    //
  }

  private getAllOperations(type: OperationType) {
    return this.operations.filter((o: IOperation) => o.getOperationType() === type);
  }

  private mapContextOperations(operations: IOperation[]) {
    const operationsByContext: Map<string, IOperation[]> = new Map();

    operations.forEach(
      (o: IOperation) => {
        const contextName = o.getContextName();
        if (!operationsByContext.has(contextName)) {
          operationsByContext.set(contextName, [o]);
        } else {
          const arr = operationsByContext.get(contextName);
          arr.push(o);
          operationsByContext.set(contextName, arr);
        }
      },
    );

    return operationsByContext;
  }

}