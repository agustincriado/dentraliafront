module.exports = function () {
  return {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            buffer: false
          },
        },
      },
    }
  };
};
