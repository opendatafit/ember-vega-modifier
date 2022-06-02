import Modifier, { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

import { isEmpty } from 'lodash';

import * as Vega from 'vega';
import * as VegaLite from 'vega-lite';
import * as VegaTooltip from 'vega-tooltip';


const DEFAULT_CONFIG: Vega.Config = {
  background: '#fff',
  arc: { fill: '#3e5c69' },
  area: { fill: '#3e5c69' },
  line: { stroke: '#3e5c69' },
  path: { stroke: '#3e5c69' },
  rect: { fill: '#3e5c69' },
  shape: { stroke: '#3e5c69' },
  symbol: { fill: '#3e5c69' },
  axis: {
    domainWidth: 0.5,
    grid: true,
    labelPadding: 2,
    tickSize: 5,
    tickWidth: 0.5,
    titleFontWeight: 'normal',
  },
  axisBand: { grid: false },
  axisX: { gridWidth: 0.2 },
  axisY: { gridDash: [3], gridWidth: 0.4 },
  legend: { labelFontSize: 11, padding: 1, symbolType: 'square' },
  range: {
    category: [
      '#3e5c69',
      '#6793a6',
      '#182429',
      '#0570b0',
      '#3690c0',
      '#74a9cf',
      '#a6bddb',
      '#e2ddf2',
    ],
  },
};


interface VegaLiteArgs {
  Args: {
    Named: {
      specType: 'vega-lite';
      spec: VegaLite.TopLevelSpec;
      data: Record<string, Record<string, number | null>>;
      config: Vega.Config;
    };
    Positional: never;
  }
}

interface VegaArgs {
  Args: {
    Named: {
      specType: 'vega';
      spec: Vega.Spec;
      data: Record<string, Record<string, number | null>>;
      config: Vega.Config;
    };
    Positional: never;
  }
}

type VegaModifierArgs = VegaArgs | VegaLiteArgs;


export default class VegaModifier extends Modifier<VegaModifierArgs> {
  private _vegaView!: Vega.View;

  constructor(
    owner: unknown,
    args: ArgsFor<VegaModifierArgs>
  ) {
    super(owner, args);
    registerDestructor(this, this.destructor);
  }

  destructor() {
    if (this._vegaView) {
      this._vegaView.finalize();
    }
  }

  async modify(
    element: Element,
    positionalArgs: PositionalArgs<VegaModifierArgs>,
    args: NamedArgs<VegaModifierArgs>
  ) {
    if (!element) {
      throw new Error('Vega has no element');
    }

    if (!this._vegaView) {
      // Create new Vega.View instance
      await this._createView(element, args);
      await this._populateData(args);
    } else {
      // Update data only
      // TODO: Handle changes to config
      await this._populateData(args);
    }
  }

  private async _createView(
    element: Element,
    args: NamedArgs<VegaModifierArgs>
  ): Promise<void> {
    element.classList.add('vega-view-modifier');

    let tooltipHandler = new VegaTooltip.Handler();

    let config = {};
    if (isEmpty(args.config)) {
      config = DEFAULT_CONFIG;
      } else {
      config = args.config;
    }

    let viewSpec = null;
    if (args.specType === 'vega-lite') {
      viewSpec = VegaLite.compile(args.spec).spec;
    } else {
      viewSpec = args.spec
    }

    this._vegaView = new Vega.View(Vega.parse(viewSpec, config), {
      renderer: 'svg',
      container: element,
      hover: true,
      // autosize: { type: 'fit', resize: true },
      tooltip: tooltipHandler.call,
    });

    await this._vegaView.runAsync();

    // TODO: Temporary bug fix for incorrect chart sizing on load before
    // first resize
    window.dispatchEvent(new Event('resize'));
  }

  private async _populateData(
    args: NamedArgs<VegaModifierArgs>
  ): Promise<void> {
    for (const name of Object.keys(args.data)) {
      this._vegaView.data(name, args.data[name]);
    }

    await this._vegaView.runAsync();
  }
}
