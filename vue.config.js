module.exports = {
  devServer: {
    proxy: {
      "/API": {
        target: "http://10.3.181.7:24511",
        changeOrigin: true, // 是否改变域名
        pathRewrite: {
          // 路径重写
          "^/API": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
        }
      }
    }
  }
};