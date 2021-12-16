
import parseFunction from 'parse-function';

class DIC{

  parser = parseFunction({ ecmaVersion: 2017 });

  constructor() {
    this.components = [];
    this.factories = [];
  }

  registerComponent(name, component){
    this.components[name] = component;
    return this;
  }
  registerFactory(name, factory){
    this.factories[name] = factory;
    return this;
  }

  create(name){

    if(!this.factories[name]){ throw new Error(`DIC did not find factory: ${name}`); }
    const factory = this.factories[name];
    const dependency = [], params = this.parser.parse(factory).args;

    params.forEach((key) => {
      if(!this.components[key]){ throw new Error(`DIC did not find component: ${key}`); }
      dependency.push(this.components[key]);
    });

    return factory(...dependency);
  }
}

export default DIC;
