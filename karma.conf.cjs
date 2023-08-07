module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'jasmine-ajax', 'sinon'],

    port: 9876,

    mime: {
      'text/x-typescript': ['ts', 'tsx']
    }
  });
}
