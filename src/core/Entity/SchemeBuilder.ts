import { ISchemeBuilder } from './ISchemeBuilder';
import { Scheme } from './Scheme';

export class SchemeBuilder implements ISchemeBuilder {

  private entityContextName: string;
  private entityFields: string[] = [];
  private constructorEntity: any;

  public addField(prop: string): ISchemeBuilder {
    this.entityFields.push(prop);
    return this;
  }

  public addConstructor(constructorEntity: any) {
    this.constructorEntity = constructorEntity;
    return this;
  }

  public contextName(name: string): ISchemeBuilder {
    this.entityContextName = name;
    return this;
  }

  public build() {
    const result: Scheme = new Scheme(this.entityContextName, this.entityFields, this.constructorEntity);
    this.clean();
    return result;
  }

  private clean() {
    this.entityFields = [];
    this.entityContextName = '';
    this.constructorEntity = null;
  }
}