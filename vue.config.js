module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '/code-kraken/' : '/',
  devServer: {
    proxy: 'http://localhost:8080',
  },
};
