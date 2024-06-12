module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'D:/TA/Phoenix-Media-Omniverse/backend/src/app.js',
      instances: 1,
      exec_mode: 'fork', // Bisa diubah menjadi 'cluster' jika Anda ingin menggunakan multiple instances
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      }
    }
  ]
};
