const path = require("path");

module.exports = {
  configureWebpack: (config) => {
    Object.assign(config, {
      resolve: {
        fallback: {
          path: require.resolve("path-browserify"),
        },
        extensions: [".js", ".vue", ".json"],
        alias: {
          vue$: "vue/dist/vue.esm.js",
          "@": path.resolve("src"),
          styles: path.resolve("src/assets/styles"),
        },
      },
      
    });
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://1.116.64.64:5004/", // 生产
        // target: "http://localhost:3000/", // 开发
        changeOrigin: true,
        // 服务器再本地需要解开如下代码，取出/api，生产环境访问远程需要注释下面代码
        // pathRewrite: {
        //   "^/api": "/",
        // },
      },
    },
  },
};
