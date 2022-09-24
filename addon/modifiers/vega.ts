import Modifier, { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

import { isEmpty } from 'lodash';

import * as Vega from 'vega';
import * as VegaLite from 'vega-lite';
import * as VegaTooltip from 'vega-tooltip';


import { DEFAULT_CONFIG } from '../utils/default-config';

interface VegaModifierArgs {
  Args: {
    Named: {
      specType: 'vega' | 'vega-lite';
      spec: Vega.Spec | VegaLite.TopLevelSpec;
      data: Record<string, Record<string, number | null>>;
      config: Vega.Config;
      isVisible: boolean;
    };
    Positional: [];
  }
}

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
    if (this && this._vegaView) {
      this._vegaView.finalize();
    }
  }

  async modify(
    element: Element,
    []: PositionalArgs<VegaModifierArgs>,
    { specType, spec, data, config, isVisible }: NamedArgs<VegaModifierArgs>
  ) {
    if (!element) {
      throw new Error('Vega has no element');
    }

    if (!this._vegaView) {
      // Create new Vega.View instance
      await this._createView(element, specType, spec, config);

      await this._populateData(data);
    } else {
      // Update data only
      // TODO: Handle changes to config
      await this._populateData(data);
    }
  }

  private async _createView(
    element: Element,
    specType: 'vega' | 'vega-lite',
    spec: Vega.Spec | VegaLite.TopLevelSpec,
    config: Vega.Config,
  ): Promise<void> {
    element.classList.add('vega-modifier');

    let tooltipHandler = new VegaTooltip.Handler();

    let _config = {};
    if (isEmpty(config)) {
      _config = DEFAULT_CONFIG;
      } else {
      _config = config;
    }

    let _viewSpec: Vega.Spec;
    if (specType === 'vega-lite') {
      _viewSpec = VegaLite.compile(spec as VegaLite.TopLevelSpec).spec;
    } else {
      _viewSpec = spec as Vega.Spec; 
    }

    this._vegaView = new Vega.View(Vega.parse(_viewSpec, _config), {
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
    data: Record<string, Record<string, number | null>>,
  ): Promise<void> {
    for (const name of Object.keys(data)) {
      this._vegaView.data(name, data[name]);
    }

    await this._vegaView.runAsync();
  }
}
