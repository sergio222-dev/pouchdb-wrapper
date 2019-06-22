import { Configurator } from './core/Configurator/Configurator';
import { AbstractEntity } from './core/Entity/AbstractEntity';
import { SchemeBuilder } from './core/Entity/SchemeBuilder';
import { Manager } from './core/Manager/Manager';

// TODO: Hacer los TEST
// TODO: Hacer el rollback

class Person extends AbstractEntity {
  public name: string = 'Sergio';
  public lastName: string = 'Molina';
}

const builder: SchemeBuilder = new SchemeBuilder();

/**
 * Schemes
 */

const person =
  builder
    .contextName(Person.name)
    .addField('name')
    .addField('lastName')
    .addConstructor(Person)
    .build()
;

const cfg = new Configurator();

/**
 * Configure the ORM
 */
cfg.addScheme(person);

const manager: Manager = cfg.getManager();

/**
 * Main
 */

main().then(() => null);

async function main() {
  const sergio = new Person('Sergio');
  sergio.name = "Sergio";
  sergio.lastName = 'que se yo';

  /**
   * PUT
   */
  manager.putEntity(sergio);
  await manager.flush();

  /**
   * UPDATE
   */

  const personRepository = manager.getRepository<Person>(Person.name);
  console.log('repository object', personRepository);
  const r: Person = await personRepository.findOneById(sergio._id);
  console.log('find a person', r);
  //
  r.name = 'Sergio'+Math.random()+5;
  manager.updateEntity(r);
  await manager.flush();

  /**
   * DELETE
   */

  manager.deleteEntity(r);
  await manager.flush();

}
