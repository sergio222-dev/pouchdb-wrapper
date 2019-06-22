import { Scheme } from '../Entity/Scheme';
import { Manager } from '../Manager/Manager';

export interface IConfigurator {
  addScheme(scheme: Scheme);
  getSchemes(): Scheme[];
  getSchemesMap(): Map<string, Scheme>
  getManager(): Manager;
}