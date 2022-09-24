import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { Spec } from 'vega';

import {
  DataRecord,
  CONFIG,
  SPEC,
  SPEC_TYPE,
  DATA_1,
  DATA_2,
} from '../utils/data';


export default class Application extends Controller {
  @tracked spec: Spec;
  @tracked specType: string;
  @tracked config: object;
  @tracked data: DataRecord;
  @tracked isVisible: boolean;

  constructor() {
    super(...arguments);

    this.spec = SPEC;
    this.specType = SPEC_TYPE;
    this.config = CONFIG;
    this.data = DATA_1;

    this.isVisible = false;
  }

  @action updateData() {
    this.data = DATA_2;
  }
  
  @action toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}
