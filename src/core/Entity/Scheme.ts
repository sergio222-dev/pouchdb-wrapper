
export class Scheme {
  private readonly entityContextName: string;
  private readonly entityFields: string[];
  private readonly entityConstructor: any;

  constructor(entityContextName: string, entityFields: string[], constructorEntity: any) {
    this.entityContextName = entityContextName;
    this.entityFields = entityFields;
    this.entityConstructor = constructorEntity;
  }

  public getContextName() {
    return this.entityContextName;
  }

  public getFields() {
    return this.entityFields;
  }

  public getConstructor() {
    return this.entityConstructor;
  }

}