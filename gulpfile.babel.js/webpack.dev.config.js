import webpack from 'webpack';
import webpackConfig from './webpack.config';

const devConfig = {
  ...webpackConfig,
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    'webpack-dev-server/client?http://0.0.0.0:3001', // WebpackDevServer host and port
    ...webpackConfig.entry
  ],
  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin()
  ]
};

export default devConfig;
