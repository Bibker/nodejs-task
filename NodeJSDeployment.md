# Node.js Deployment

> Steps to deploy a Node.js app to AWS using PM2, NGINX as a reverse proxy.

## 1. Create Free AWS Account

Create free AWS Account at https://aws.amazon.com/

## 2. Create and Lauch an EC2 instance and SSH into machine

I would be creating a t2.micro ubuntu machine for this demo.

## 3. Install Node and NPM

```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

node --version
```

## 4. Clone your project from Github

```
git clone https://github.com/bibker/nodejs-task
```

## 5. Install dependencies and test app

```
sudo npm i pm2 -g
pm2 start index

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot
pm2 startup ubuntu
```

## 6. Setup Firewall

```
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

## 7. Install NGINX and configure

```
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default
```

Add the following to the location part of the server block

```
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

```
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo nginx -s reload
```
