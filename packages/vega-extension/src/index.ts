/**
  Copyright (c) Jupyter Development Team.
  Distributed under the terms of the Modified BSD License.
*/

import {
  Widget
} from '@phosphor/widgets';

import {
  JupyterLab,
  JupyterLabPlugin
} from '@jupyterlab/application';

import {
  IRenderMime, RenderMime
} from '@jupyterlab/rendermime';


import {
  vega
} from '@jupyterlab/vega';


function generateRenderMimePlugin(options: IOptions): JupyterLabPlugin<void> {
  let mimeType = options.mimeType;
  let widget = options.widget;


  class _Renderer implements RenderMime.IRenderer {
    /**
     * The mimeTypes this renderer accepts.
     */
    mimeTypes = [mimeType];
    canRender(options: RenderMime.IRenderOptions): boolean {
      return this.mimeTypes.indexOf(options.mimeType) !== -1;
    }
    render(options: RenderMime.IRenderOptions): Widget {
      return new widget(options);
    }
    wouldSanitize(options: RenderMime.IRenderOptions): boolean {
      return !options.model.trusted;
    }
  }

  function activate(app: JupyterLab, rendermime: IRenderMime) {
    rendermime.addRenderer({
      mimeType: options.mimeType,
      renderer: new _Renderer()
    }, 0);
  }

  return {
    activate,
    id: options.id,
    requires: [IRenderMime],
    autoStart: true
  };
}

interface IOptions {
  id: string;
  widget: Widget;
  mimeType: string;
}


export default plugin = generateRenderMimePlugin({
  id: 'jupyter.extensions.vega',
  widget: vega.widget,
  mimeType: vega.mimeType
});
