import path from 'path';
import { defineConfig } from 'dumi';

export default defineConfig({
  alias: {
    '@pansy/request': path.join(__dirname, 'src/index.ts'),
  },
  favicons: [
    'https://gw.alipayobjects.com/zos/bmw-prod/b874caa9-4458-412a-9ac6-a61486180a62.svg'
  ],
  themeConfig: {
    name: 'Request',
    logo: 'https://gw.alipayobjects.com/zos/bmw-prod/b874caa9-4458-412a-9ac6-a61486180a62.svg',
  },
});
