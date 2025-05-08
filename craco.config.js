module.exports = {
  devServer: {
    proxy: {
      "/editor": "http://localhost:3001",
    },
  },
};
