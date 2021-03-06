import type { IConfig as Config } from 'dumi';

const config: Config = {
  mode: 'site',
  title: 'Pansy Request',
  logo: 'https://gw.alipayobjects.com/zos/bmw-prod/b874caa9-4458-412a-9ac6-a61486180a62.svg',
  favicon:
    'https://gw.alipayobjects.com/zos/bmw-prod/69a27fcc-ce52-4f27-83f1-c44541e9b65d.svg',
  hash: true,
  navs: [
    null,
    {
      title: 'Axios',
      path: 'https://axios-http.com/zh'
    },
    {
      title: 'GitHub',
      path: 'https://github.com/pansyjs/request',
    },
  ],
}

export default config;
