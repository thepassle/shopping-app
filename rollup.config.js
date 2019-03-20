import createDefaultConfig from '@open-wc/building-rollup/modern-config';

import copy from 'rollup-plugin-copy';

const config = createDefaultConfig({ input: './src/index.html' });

export default {
  ...config,
  plugins: [
    ...config.plugins,
    copy({
      "src/img": "dist/img",
      verbose: true
    })
  ],
};
