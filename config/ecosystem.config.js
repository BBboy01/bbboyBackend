// PM2 Config File
// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
  apps: [
    {
      name: "blog",
      script: "./server.js",
      autorestart: true,
      watch: true,
      ignore_watch: [
        // 不用监听的文件
        "node_modules",
        "logs",
      ],
      max_memory_restart: "1G",
      error_file: "./logs/app-err.log", // 错误日志文件
      out_file: "./logs/app-out.log", // 正常日志文件
      env: {
        COMMON_VARIABLE: "true",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    production: {
      user: "root",
      host: "49.232.134.166",
      ref: "origin/master",
      repo: "git@github.com:BBboy01/bbboyBackend.git",
      path: "/ftp/node/bbboy_blog",
      "post-deploy":
        "git pull && yarn && pm2 reload ecosystem.config.js --env production",
    },
  },
};
