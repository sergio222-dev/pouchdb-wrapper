import { Scheme } from '../Entity/Scheme';
import { Manager } from '../Manager/Manager';
import { IConfigurator } from './IConfigurator';

export class Configurator implements IConfigurator {

  private schemes: Map<string, Scheme> = new Map<string, Scheme>();

  public addScheme(scheme: Scheme) {
    const contextType: string = scheme.getContextName();
    this.schemes.set(contextType, scheme);
  }

  public getSchemes() {
    const schemes: Scheme[] = [];
    this.schemes.forEach(
      (v: Scheme) => {
        schemes.push(v);
      }
    );

    return schemes;
  }

  public getSchemesMap() {
    return this.schemes;
  }

  public getManager() {
    const manager: Manager = Manager.getInstance();
    manager.configure(this);

    return manager;
  }

  
}