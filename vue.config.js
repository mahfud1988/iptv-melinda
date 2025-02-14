const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  configureWebpack: {
    plugins: [
      // Anda bisa menambahkan plugin atau konfigurasi lainnya di sini
    ],
  },

  chainWebpack: config => {
    // Menyuntikkan variabel .env ke dalam proyek
    config.plugin('define').tap(definitions => {
      definitions[0]['process.env.VUE_APP_MISTRAL_API_KEY'] = JSON.stringify(process.env.VUE_APP_MISTRAL_API_KEY);
      return definitions;
    });
  },
};
