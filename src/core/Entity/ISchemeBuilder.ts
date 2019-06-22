import { Scheme } from './Scheme';

export interface ISchemeBuilder {
  contextName(name: string): ISchemeBuilder;
  addField(name: string): ISchemeBuilder;
  addConstructor(constructor: any): ISchemeBuilder;
  build(): Scheme;
}