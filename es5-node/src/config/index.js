const config = {
  IsLocal: process.env.NODE_ENV === 'local',
  IsProd: process.env.NODE_ENV === 'prod',

  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    host: process.env.DB_HOSTNAME,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  jwt: {
    expDuration: process.env.JWT_TIME,
    secretKey: process.env.JWT_SECREATE_kEY
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  TempFileDir: `${__dirname}/../../uploads`,
  logDir: process.env.LOG_DIR,

  WebUrl: process.env.WEB_URL || null,
};

module.exports = config;