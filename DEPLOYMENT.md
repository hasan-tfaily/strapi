# 🚀 Strapi CMS Deployment Guide

This guide will help you deploy your Strapi CMS to a production server.

## 📋 Prerequisites

- Ubuntu/Debian server with root access
- Domain name (optional, for SSL setup)
- SSH access to your server

## 🛠️ Deployment Files

The following files have been created for deployment:

- `deploy.sh` - Main deployment script
- `ecosystem.config.js` - PM2 configuration for process management
- `env.production.example` - Production environment variables template
- `nginx.conf.example` - Nginx configuration template

## 🚀 Quick Deployment

1. **Update the deployment script** (if needed):
   ```bash
   # Edit the server IP and app name in deploy.sh
   nano deploy.sh
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

## ⚙️ Manual Configuration Steps

After running the deployment script, you need to complete these steps:

### 1. Configure Environment Variables

SSH into your server and edit the environment file:
```bash
ssh root@157.180.36.164
cd /var/www/my-project
nano .env
```

Update the following variables in `.env`:
```env
# Database Configuration
DATABASE_PASSWORD=your_secure_password_here

# Security Keys (Generate secure random strings)
APP_KEYS=your_app_keys_here
API_TOKEN_SALT=your_api_token_salt_here
ADMIN_JWT_SECRET=your_admin_jwt_secret_here
JWT_SECRET=your_jwt_secret_here
TRANSFER_TOKEN_SALT=your_transfer_token_salt_here
```

### 2. Generate Security Keys

You can generate secure keys using:
```bash
# Generate random strings for your security keys
openssl rand -base64 32
```

### 3. Configure Nginx (Optional)

If you want to use a domain name:

1. Copy the Nginx configuration:
   ```bash
   cp nginx.conf.example /etc/nginx/sites-available/my-project
   ```

2. Edit the configuration:
   ```bash
   nano /etc/nginx/sites-available/my-project
   ```

3. Update the domain name and enable the site:
   ```bash
   ln -s /etc/nginx/sites-available/my-project /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

### 4. Set up SSL Certificate (Optional)

If you have a domain name, set up SSL with Let's Encrypt:

```bash
# Install Certbot
apt install certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Management Commands

### PM2 Process Management
```bash
# Check status
pm2 status

# Restart application
pm2 restart my-project

# View logs
pm2 logs my-project

# Stop application
pm2 stop my-project

# Start application
pm2 start my-project
```

### Database Management
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# List databases
\l

# Connect to your database
\c my_project
```

## 🐛 Troubleshooting

### Common Issues

1. **Application won't start**:
   - Check PM2 logs: `pm2 logs my-project`
   - Verify environment variables: `cat .env`
   - Check database connection

2. **Database connection issues**:
   - Verify PostgreSQL is running: `systemctl status postgresql`
   - Check database credentials in `.env`
   - Ensure database exists: `sudo -u postgres psql -c "\l"`

3. **Nginx issues**:
   - Test configuration: `nginx -t`
   - Check Nginx status: `systemctl status nginx`
   - View Nginx logs: `tail -f /var/log/nginx/error.log`

4. **Permission issues**:
   - Fix file permissions: `chown -R www-data:www-data /var/www/my-project`
   - Check directory permissions: `ls -la /var/www/my-project`

## 📊 Monitoring

### Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# System resources
htop

# Disk usage
df -h

# Memory usage
free -h
```

### Log Files
- Application logs: `pm2 logs my-project`
- Nginx logs: `/var/log/nginx/`
- System logs: `/var/log/syslog`

## 🔄 Updates and Maintenance

### Updating the Application
1. Pull latest changes
2. Run `npm install --production`
3. Run `npm run build`
4. Restart with PM2: `pm2 restart my-project`

### Database Backups
```bash
# Create backup
pg_dump -U strapi_user -h localhost my_project > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
psql -U strapi_user -h localhost my_project < backup_file.sql
```

## 🌐 Access Your Application

- **Direct access**: `http://157.180.36.164:1337`
- **With domain**: `https://your-domain.com` (after SSL setup)
- **Admin panel**: `http://157.180.36.164:1337/admin` (or your domain)

## 📝 Notes

- The application runs on port 1337 by default
- PM2 will automatically restart the application if it crashes
- All uploads are stored in `/var/www/my-project/public/uploads/`
- Database is PostgreSQL with the name `my_project`
- User `strapi_user` has full access to the database

## 🆘 Support

If you encounter issues:
1. Check the logs first
2. Verify all environment variables
3. Ensure all services are running
4. Check firewall settings
5. Verify database connectivity
