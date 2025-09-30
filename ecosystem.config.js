module.exports = {
  apps: [
    {
      name: "my-project",
      script: "npm",
      args: "start",
      cwd: "/var/www/my-project",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 1337,
        HOST: "0.0.0.0",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 1337,
        HOST: "0.0.0.0",
        DATABASE_CLIENT: "postgres",
        DATABASE_HOST: "localhost",
        DATABASE_PORT: 5432,
        DATABASE_NAME: "my_project",
        DATABASE_USERNAME: "strapi_user",
        DATABASE_PASSWORD: "your_secure_password_here",
        ADMIN_JWT_SECRET:
          "l8b2YZmR+CnMmBGCkSvp+aDh+JWtruRebVtSyBC38pJiMn5D+A8Jw7hKlDn2p4lsRtWXoxowjFdH6uzV2v3reg==",
        API_TOKEN_SALT: "ukaYOy4T01SDQpq6uRsDz1mAuD4Tmqpo6E73uqHZb6U=",
        TRANSFER_TOKEN_SALT: "9+i3ZqGrA+EyhCkX4eQ00aI1LRhq2HHYRxx4TuV+Cdw=",
        ENCRYPTION_KEY:
          "l8b2YZmR+CnMmBGCkSvp+aDh+JWtruRebVtSyBC38pJiMn5D+A8Jw7hKlDn2p4lsRtWXoxowjFdH6uzV2v3reg==",
        APP_KEYS:
          "l8b2YZmR+CnMmBGCkSvp+aDh+JWtruRebVtSyBC38pJiMn5D+A8Jw7hKlDn2p4lsRtWXoxowjFdH6uzV2v3reg==,ukaYOy4T01SDQpq6uRsDz1mAuD4Tmqpo6E73uqHZb6U=",
      },
    },
  ],
};
