module.exports = {
  apps: [
    {
      name: 'my-project',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/my-project',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 1337,
        HOST: '0.0.0.0'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 1337,
        HOST: '0.0.0.0',
        DATABASE_CLIENT: 'postgres',
        DATABASE_HOST: 'localhost',
        DATABASE_PORT: 5432,
        DATABASE_NAME: 'my_project',
        DATABASE_USERNAME: 'strapi_user',
        DATABASE_PASSWORD: 'your_secure_password_here',
        JWT_SECRET: 'your_jwt_secret_here',
        ADMIN_JWT_SECRET: 'your_admin_jwt_secret_here',
        APP_KEYS: 'your_app_keys_here',
        API_TOKEN_SALT: 'your_api_token_salt_here',
        TRANSFER_TOKEN_SALT: 'your_transfer_token_salt_here'
      }
    }
  ]
};
