import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { cloneDeep } from 'lodash';

import { Resource, View } from 'opendatafit-types';

import {
  DATAPACKAGE,
  DATA,
  FIT_DATA,
  DATA_2,
  FIT_DATA_2
} from '../utils/data';


export default class Application extends Controller {
  @tracked dataResource!: Resource;
  @tracked fitResource!: Resource;

  constructor() {
    super(...arguments);

    this.dataResource = DATAPACKAGE.resources[4] as Resource;
    this.dataResource.data = DATA;

    this.fitResource = DATAPACKAGE.resources[5] as Resource;
    this.fitResource.data = FIT_DATA;
  }

  get resources() {
    return [
      this.dataResource,
      this.fitResource
    ];
  }

  get data() {
    type Data = Record<string, number | null>;
    let data: Record<string, Data> = {};
    data[this.dataResource.name] = this.dataResource.data as Data;
    data[this.fitResource.name] = this.fitResource.data as Data;
    return data;
  }

  get spec() {
    return this.view.spec;
  }

  get specType() {
    return this.view.specType;
  }

  get view() {
    return DATAPACKAGE.views[4] as View;
  }

  get config() {
    return {
      "background": "#fff",
      "arc": {"fill": "#3e5c69"},
      "area": {"fill": "#3e5c69"},
      "line": {"stroke": "#3e5c69"},
      "path": {"stroke": "#3e5c69"},
      "rect": {"fill": "#3e5c69"},
      "shape": {"stroke": "#3e5c69"},
      "symbol": {"fill": "#3e5c69"},
      "axis": {
        "domainWidth": 0.5,
        "grid": true,
        "labelPadding": 2,
        "tickSize": 5,
        "tickWidth": 0.5,
        "titleFontWeight": "normal"
      },
      "axisBand": {"grid": false},
      "axisX": {"gridWidth": 0.2},
      "axisY": {"gridDash": [3], "gridWidth": 0.4},
      "legend": {"labelFontSize": 11, "padding": 1, "symbolType": "square"},
      "range": {
        "category": [
          "#3e5c69",
          "#6793a6",
          "#182429",
          "#0570b0",
          "#3690c0",
          "#74a9cf",
          "#a6bddb",
          "#e2ddf2"
        ]
      }
    };
  }

  @action updateData() {
    let updatedDataResource = cloneDeep(this.dataResource)
    updatedDataResource.data = DATA_2;
    this.dataResource = updatedDataResource;
    let updatedFitResource = cloneDeep(this.fitResource)
    updatedFitResource.data = FIT_DATA_2;
    this.fitResource = updatedFitResource;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}
