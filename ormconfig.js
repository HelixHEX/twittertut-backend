module.exports = {
    "type": "postgres",
    "port": "5432",
    "host": prcess.env.DATABASE_URL,
    "database": "twittertut",
    "synchronize": true,
    "logging": true,
    "entities": ["dist/entities/*.js"],
    "migrations": ["dist/migrations/**/*.js"],
    "cli": {
      "migrationsDir": "src/migrations"
    }
  }