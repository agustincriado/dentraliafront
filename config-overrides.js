module.exports = function override(config, env) {
  
  let loaders = config.resolve
  loaders.splice(0, 0, {
    fallback: {
      buffer: false
    }
  })
  return config
};
