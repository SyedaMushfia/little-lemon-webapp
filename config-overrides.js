module.exports = {
    jest: function(config) {
      config.setupFiles = ['./jest.setup.js'];  // Add your setupFiles configuration here
      return config;
    }
  };
  