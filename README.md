# Notes

## Compatibility

- Node v10.18.1
- Nuxt v2.11.0

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Plugin Setup

### Buefy

- Install as [commit](https://github.com/pdthang/octomaker-blog/commit/81030cb4f8779d8d84a6f3f5566c0c71c6d2f70b)

### Firebase

#### Get started

- Go to [Firebase Console](https://console.firebase.google.com/) > Add project
- Add an app to get started (Choose Web)
- Project Overview > Project Setting > General 
  - Your project
    - Google Cloud Platform (GCP) resource location > `asia-east2`
    - Public-facing name `OctoMaker` 
    - Support email `pdthang59@gmail.com`
  - Your apps > `</>` (web) > Add Firebase to your web app
    - Register app > `blog.octormaker.com`
    - Choose `Also set up Firebase Hosting for this app`
  - Add Firebase SDK 
  - Install Firebase CLI if any
  - Deploy to Firebase Hosting if any
- Project Overview > Project Setting > General > Your apps
  - Firebase SDK snippet > Config > copy `firebaseConfig` for nuxt app
  - It is possible to add more apps

#### Authentication

- Sign-in method > Email/Password
- Authorized domains > Add domain (`octomaker.com` and `blog.octomaker.com`)
- Templates
  
  - Email address verification
    - Project public-facing name > `OctoMaker`
    - Project support email > `pdthang59@gmail.com`
    - Sender name > `OctoMaker Team`
    - From > `norely`
    - customize domain > Add domain `octomaker.com` > Verify domain > Add the DNS records on namsilo
    - Subject > [OctoMaker] Verify Email
    - Action URL (%LINK% value) > customize action URL > `https://www.blog.octomaker.com/user/action`
    - Waiting for namesilo process about 2 hours (`TTL-7207`) then come back to apply `custom domain`

  - Password reset
    - Project public-facing name > `OctoMaker`
    - Project support email > `pdthang59@gmail.com`
    - Sender name > `OctoMaker Team`
    - From > `norely`
    - customize domain > Add domain `octomaker.com` > Verify domain > Add the DNS records on namsilo
    - Subject > [OctoMaker] Verify Email
    - Action URL (%LINK% value) > customize action URL > `https://www.blog.octomaker.com/user/action`

  - Email address change
    - Project public-facing name > `OctoMaker`
    - Project support email > `pdthang59@gmail.com`
    - Sender name > `OctoMaker Team`
    - From > `norely`
    - customize domain > Add domain `octomaker.com` > Verify domain > Add the DNS records on namsilo
    - Subject > [OctoMaker] Email Changed Notification
    - Action URL (%LINK% value) > customize action URL > `https://www.blog.octomaker.com/user/action`

#### Database

- Realtime Database > Create database > Start in locked mode
- Rules

  ```json
  {
    "rules": {
      ".read": "true",
      ".write": "auth != false",
      "posts": {
        ".indexOn": ["id", "title", "updatedDate", "creator/id", "category"]
      },
      "users": {
        ".indexOn": ["email"]
      }
    }
  }
  ```

#### Storage

- Get started > Set up Cloud Storage
  - Secure rules for Cloud Storage
  
    ```js
    service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
    ```

  - Set Cloud Storage location > `asia-east2`
  
- Rules

  ```js
  service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
  ```

### Facebook App

- Go to [Facebook developer](https://developers.facebook.com/) > My Apps > Create App > Create a New App ID > copy AppId to `fc.js` & meta tag in `nuxt.config.js`
- Active Facebook App after finishing hosting setup - TODO
- References
  - [Sharing Best Practices for Websites & Mobile Apps](https://developers.facebook.com/docs/sharing/best-practices)
  - [Facebook for web](https://developers.facebook.com/docs/sharing/web)
  - [Facebook meta tags](https://developers.facebook.com/docs/sharing/webmasters/)
  - [Facebook sharing](https://developers.facebook.com/docs/sharing/best-practices)


### Google Analytics

- [How to use Google Analytics in Nuxt?](https://nuxtjs.org/faq/google-analytics/)
- [Google Analytics Nuxt module](https://github.com/nuxt-community/analytics-module)
- [Where do i find the GA tracking id?](https://support.google.com/analytics/thread/13109681?hl=en)
- [Analytic Helps](https://support.google.com/analytics)
- [GA articles on dev.to](https://dev.to/search?q=Google%20Analytics&filters=class_name:Article)

## VPS Setup

### References

- [Nuxt & PM2](https://medium.com/@vipercodegames/nuxt-deploy-809eda0168fc)
- [Auto deploy Node.js app lên server qua SSH với GitLab CI/CD và PM2](https://viblo.asia/p/auto-deploy-nodejs-app-len-server-qua-ssh-voi-gitlab-cicd-va-pm2-1Je5Ed44lnL)

### Get Started

- Create a VPS on [Vultr](https://vultr.com/) with Ubuntu 18.04
  - This tutorial isn't compatibile
    - with server size `1 CPU - 512MB Memory - 500GB Bandwidth`, `npm install/yarn install` && `npm run build/yarn run build` in `nuxt` container cannot execute
    - with server size `1 CPU - 1024MB Memory - 1000GB Bandwidth`, `npm run build/yarn run build` in `nuxt` container cannot execute
  - Other server sizes runs well
- Add A records with VPS public IP to your domain by visiting your DNS provider or registrar (namesilo)
  - Set `blog.octomaker.com`, `www.blog.octomaker.com`, `octomaker.com`, `wwww.octomaker.com` with same VPS Ipv4
- Use terminal tool to access VPS remotely with it Username/Password
- [Initial Server Setup with Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) or use [automatic script](https://www.digitalocean.com/community/tutorials/automating-initial-server-setup-with-ubuntu-18-04)
  - Relogin with user account instead of `root` account
- [Set Up SSH Keys on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804) if any - recommend
- [Install Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
- [Secure Nginx with Let's Encrypt on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)
- Config nginx to redirect domain `octomaker.com` `www.octomaker.com`
  
  ```bash
  # edit /etc/nginx/sites-available/blog.octomaker.com
  sudo vim /etc/nginx/sites-available/blog.octomaker.com
  ```
  
  ```bash
  server {
    listen 80;
    listen [::]:80;
    server_name  blog.octomaker.com www.blog.octomaker.com;

    location / {
      return 301 https://$host$request_uri;
    }
    ....
  }

  server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name  blog.octomaker.com www.blog.octomaker.com;
    ....
    # redirect www to non-www
    if ($host = www.blog.octomaker.com) {
      return 301 https://blog.octomaker.com$request_uri;
    }

    # redirect to default domains
    if ($host = www.octomaker.com) {
      return 301 https://blog.octomaker.com$request_uri;
    }

    if ($host = octomaker.com) {
      return 301 https://blog.octomaker.com$request_uri;
    }

    location / {
      proxy_pass http://localhost:3000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
    ....
  }
  ```

  ```bash
  # restart nginx
  sudo systemctl restart nginx
  ```

- [Set Up a Node.js Application](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)
  - [Note - Install Node v10](https://github.com/nodesource/distributions#installation-instructions)
  
    ```bash
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

- Install [yarn on ubuntu 18.04](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/)
  
  ```bash
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt update
  sudo apt install yarn
  ```

- Install npm on ubuntu 18.04 if any
  
  ```bash
  sudo apt install npm
  npm -v
  ```

- Install `git` on ubuntu 18.04
  
  ```bash
  sudo apt update
  sudo apt install git
  git --version
  ```
  
- From VPS, Git clone/fetch new code
  
  ```bash
  git clone https://github.com/pdthang/octomaker-blog.git src
  ```

- `cd src` > `npm install/yarn install` > `npm run build/yarn build`
  - In case of weak VPS, `build process` is impossible. You can build the project at your computer
  and copy `.nuxt` and `static` folder to `src`.
  - Another way, build the project at your computer > remove `.nuxt` and `dist` in `.gitignore` > `git push` all source including `.nuxt` folder to     git server > at the vps, `git pull` new source including `.nuxt` to run nuxt app (recommend)
- Start project 
  - `pm2 start npm --name octomaker.blog -- start` or 
  - `npm run start/yarn start` (not recommend)

### Summary - Setup for the future project

- Create VPS and install step by step as in this tutorial
  - It is possible to create VPS with snapshot on Vultr
  - Server size should be at least `1 CPU - 2048MB Memory - 2000GB Bandwidth`
- Add A records with VPS public IP to your domain by visiting your DNS provider or registrar (namesilo)
  - Set `blog.octomaker.com`, `www.blog.octomaker.com`, `octomaker.com`, `wwww.octomaker.com` with same VPS Ipv4
- Use terminal tool to access VPS remotely with it Username/Password
- [Initial Server Setup with Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) or use [automatic script](https://www.digitalocean.com/community/tutorials/automating-initial-server-setup-with-ubuntu-18-04)
  - Relogin with user account instead of `root` account
- [Set Up SSH Keys on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804) if any - recommend
- Install `git` on ubuntu 18.04

  ```bash
  sudo apt update
  sudo apt install git
  git --version
  ```

- Clone git repo
  
  ```bash
  git clone https://github.com/pdthang/octomaker-blog.git src
  cd src
  ```

- Install packages
  
  ```bash
  npm install/yarn install
  ```

- Build project. Don't need to execute this command if there is a prebuild `.nuxt` in `./src/app` folder.

  ```bash
  
  npm run build/yarn build
  ```

- Run project

  ```bash
  pm2 start npm --name octomaker.blog -- start
  ```
