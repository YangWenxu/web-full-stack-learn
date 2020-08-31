import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'channel', ...(require('/Users/gaoshaoyun/Documents/gaoshaoyun/12期/lesson6-1019-umi/src/models/channel.js').default) });
app.model({ namespace: 'channle2', ...(require('/Users/gaoshaoyun/Documents/gaoshaoyun/12期/lesson6-1019-umi/src/models/channle2.js').default) });
app.model({ namespace: 'global', ...(require('/Users/gaoshaoyun/Documents/gaoshaoyun/12期/lesson6-1019-umi/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/Users/gaoshaoyun/Documents/gaoshaoyun/12期/lesson6-1019-umi/src/models/login.js').default) });
app.model({ namespace: 'more', ...(require('/Users/gaoshaoyun/Documents/gaoshaoyun/12期/lesson6-1019-umi/src/models/more.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/gaoshaoyun/Documents/gaoshaoyun/12期/lesson6-1019-umi/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/gaoshaoyun/Documents/gaoshaoyun/12期/lesson6-1019-umi/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
