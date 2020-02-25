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

- [Dockerise your Nuxt SSR App like a boss - Part 1](https://dev.to/vuevixens/dockerise-your-nuxt-ssr-app-like-a-boss-a-true-vue-vixens-story-4mm6)
  > In the tutorial, nuxt app runs with [port 3333](https://github.com/VueVixens/website/blob/master/package.json#L9)
- [Deploy ứng dụng Nuxt với Docker và Nginx](https://viblo.asia/p/deploy-ung-dung-nuxt-voi-docker-va-nginx-3P0lPnNpKox)
- [Nginx and Let’s Encrypt with Docker in Less Than 5 Minutes](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)
  - [Source code](https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh)
- [How to dockerize your static website with Nginx](https://dev.to/koddr/how-to-dockerize-your-static-website-with-nginx-automatic-renew-ssl-for-domain-by-certbot-and-deploy-it-to-digitalocean-4cjc)
  - [Source code](https://github.com/koddr/example-static-website-docker-nginx-certbot)
- [Dockerise your Nuxt SSR App like a boss - Part 2](https://dev.to/vuevixens/dockerise-your-nuxt-ssr-app-like-a-boss-a-true-vue-vixens-story-part-2-1fgj) - not recommend
- [Deploying a Nuxt.js App with Docker](https://jonathanmh.com/deploying-a-nuxt-js-app-with-docker/)

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
- [Install and Use Docker on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)
- [Install Docker Compose on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04)
  - Check the [current release](https://github.com/docker/compose/releases) and if necessary, update it in the command below

    ```bash
    sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    ```

- Another way
  
  ```bash
  sudo apt update
  sudo apt install -y docker.io git
  sudo usermod -a -G docker ${YOUR_USER}
  sudo service docker start
  sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  ```

- Install `git` on ubuntu 18.04
  
  ```bash
  sudo apt update
  sudo apt install git
  git --version
  ```

- Refactor folder structure
  - `app` contains whole nuxt app including `nuxt.config.js`, `package.json`, `git files` and you can develop nuxt app directly in this folder.
  - `nginx` contains `nginx config` file
  - `logs` contains `nginx` logs

- Create `Dockerfile` for nuxt app in `app` folder
  
  ```bash
  FROM node:10.18.1

  ENV APP_ROOT /src

  RUN mkdir ${APP_ROOT}
  WORKDIR ${APP_ROOT}
  ADD . ${APP_ROOT}

  RUN yarn install
  RUN yarn run build

  ENV HOST 0.0.0.0
  ```

  - In this file we specify the node version we want our container to run. That's entirely up to you. latest is also a valid tag.
  - It is also specified the app root directory and then the commands we run to build our app.
  - The host is set to `0.0.0.0` to give full external access to the app container.
  > Port `3000` of nuxt app will automatically map with port `3000` of container
  - Run a test container if any

    ```bash
    docker run -it -p 80:3000 my_awesome_app
    ```

    > Port `3000` of nuxt app will map with port `80` of container

- Create `docker-compose.yml` in `root` folder to run the entire app including `nuxt app`, `nginx`
  > `docker-compose.yml` is refered from [Deploy ứng dụng Nuxt với Docker và Nginx](https://viblo.asia/p/deploy-ung-dung-nuxt-voi-docker-va-nginx-3P0lPnNpKox) and just change 
  >   - `build: .` to `build: ./app/`
  >   - `.nginx:/etc/nginx/conf.d` to `./nginx:/etc/nginx/conf.d`

  ```bash
  version: "3"

  services:
    nuxt:
      build: ./app/
      container_name: nuxt
      restart: always
      env_file: .env
      command: "yarn run start"
      networks:
        - flat-network

    nginx:
      image: nginx:1.17
      container_name: nginx
      env_file: .env
      ports:
        - "${APP_PORT}:80"
      volumes:
        - ./nginx:/etc/nginx/conf.d
        - "${LOG_PATH}:/var/log/nginx"
      depends_on:
        - nuxt
      networks:
        - flat-network

  networks:
    flat-network:
  ```

- Create `.env` file
  
  ```bash
  NODE_ENV=development
  APP_PORT=80
  LOG_PATH=./logs
  ```

- Explain by Vietnamese
  - `docker-compose.yml`
    - `services` các docker service sẽ chạy, ở đây mình sẽ có 2 service là nuxt và nginx lần lượt chạy nuxt app và nginx reverse proxy, đặt tên tuỳ ý sao cho dễ hiểu là được.
  
      - `build` docker sẽ build tại ngữ cảnh được chỉ định (context) . theo cấu hình trong Dockerfile.
  
      - `image` chỉ định image để build thay thì đường dẫn đến thư mục để build, image tương tự như trong Dockerfile.
  
      - `container_name` tên container, nên đặt tên dễ hiểu để tiện quản lý.
  
      - `env_file` chỉ định file chứa biến môi trường phục vụ cho quá trình build. Ở đây mình có 1 lưu ý cho bạn là   nên đặt file `.env` cùng thư mục với context của docker để tránh những phiền phức đau đầu không đáng.
  
      - `ports` mapping port bên trong container ra server bên ngoài.

        Trong service `nuxt`, nếu bạn khai báo thêm `3333:3000` thì sẽ quay lại như trường hợp bước dockerize phía trên, app của bạn sẽ được serve ở cổng 3333 của server (không qua nginx). Ở đây mình dùng nginx nên trong service nuxt không cần mapping port nữa.

        Trong service nginx bạn sẽ bind cổng `{APP_PORT}` ở server thật vào cổng 80 của nginx bên trong container, cổng 80 bên trong container sẽ forward vào cổng 3000 của service nuxt (xem file cấu hình nginx bên dưới).

      - `depends_on` ràng buộc - đợi service `nuxt` start thành công mới start service `nginx` (lưu ý là `depends_on` chỉ đợi srart xong chứ không đợi đến khi "ready" nhé).
  
      - `volumes` mount đường dẫn giữa server thật và bên trong container, ở đây bạn hiểu nôm na là bên trong     container tạo 1 shortcut (`symbolic link`) đến thư mục được chỉ định ở bên ngoài server. Như vậy mọi thay đổi về nội dung bên trong thư mục này được cập nhật đồng bộ giữa bên trong container và server bên ngoài (host) - [Đọc thêm về volumes](https://docs.docker.com/compose/compose-file/#volumes).
  
        Ở đây mình sẽ mount file config nginx vào và container và lưu file logs của nginx ra ngoài host.

      - `networks`  khai báo các networks mà service sẽ join vào.
  
      - `command` lệnh sẽ chạy sau khi build xong.
  
    - `networks` tạo networks, mỗi service sẽ chạy trên mỗi máy khác nhau (container), cần connect vào chung 1 network mới có thể giao tiếp với nhau.
  - `.env` file biến môi trường quá quen thuộc rồi, tuy nhiên mình cũng xin lưu ý với các bạn là không có các dấu `"` hay `'` gì đâu nhé. Nó sẽ hiểu các `dấu quote` đó là 1 phần giá trị của biến.
    - `NODE_ENV` môi trường build.
    - `APP_PORT` cổng mà ứng dụng sẽ chạy khi truy cập IP của host.
    - `LOG_PATH` đường dẫn đến thư mục chứa log của nginx.

- Create `default.conf` config file for `nginx` in nginx folder
  
  ```bash
  server {
    listen       80;
    server_name  localhost;

    client_max_body_size 64M;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    location / {
      proxy_pass http://nuxt:3000;
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
  }
  ```

  - Listen `80` lắng nghe ở cổng `80`, nếu bạn thích đổi con số, thì phải đổi cả khai báo trong docker-compose.yml

    ```bash
    - ports:
      - "${APP_PORT}:80"
    ```

  - proxy_pass http://nuxt:3000 trong đó `nuxt` là tên service bạn khai báo ở `docker-compse.yml`
  - Refer [How To Install Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04) to know why it is `client_max_body_size 64M;`

- `git clone` repo of the project to VPS
  
  ```bash
  git clone https://github.com/pdthang/octomaker-blog.git src
  cd src
  ```

- Run the project

  ```bash
  docker-compose up --build -d
  ```

  - `--build` Build images trước khi containers.
  - `--detach` hoặc `-d` chạy containers ở background, in ra tên các container mới.

  - In the case of small VPS, the process will be stopped at build step

    ```bash
    [5/5] Building fresh packages...
    error An unexpected error occurred: "/src/node_modules/core-js: spawn ENOMEM".
    info If you think this is a bug, please open a bug report with the information provided in "/src/yarn-error.log".
    info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
    ERROR: Service 'nuxt' failed to build: The command '/bin/sh -c yarn install' returned a non-zero code: 1
    ```

    - Solution 
      - Build the project at your computer > remove `.nuxt` and `dist` in `.gitignore` > `git push` all source including `.nuxt` folder to git server
      - Change `Dockerfile` for nuxt app in `app` folder. Disable `RUN yarn install` and/or `RUN yarn run build` if there are `node_modules` and/or a 
        prebuild `.nuxt` in `./src/app` folder.
  
        ```bash
        FROM node:10.18.1

        ENV APP_ROOT /src

        RUN mkdir ${APP_ROOT}
        WORKDIR ${APP_ROOT}
        ADD . ${APP_ROOT}

        RUN yarn install
        RUN yarn run build

        ENV HOST 0.0.0.0
        ```

- Linking up `nginx` and `certbot`
  - Add `certbot` service to `docker-compose.yml` file

    ```bash
    certbot:
      image: certbot/certbot
    ```

  - Add this to the `volumes` list of the `nginx` and `certbot` section (don't create `certbot` folder)

    ```bash
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    ```

  - Make nginx serve the challenge files from certbot by adding this into `Port 80` section of `nginx/default.conf`

    ```bash
    location ^~ /.well-known/acme-challenge/ {
      root /var/www/certbot;
    }
    ```

  - Link certificates to nginx by adding into `Port 433` section of `nginx/default.conf`

    ```bash
    ssl_certificate /etc/letsencrypt/live/blog.octomaker.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blog.octomaker.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    ```

  - Add the following into `Port 433` section of `nginx/default.conf` for redirection

    ```bash
    if ($host = www.octomaker.com) {
      return 301 https://blog.octomaker.com$request_uri;
    }

    if ($host = octomaker.com) {
      return 301 https://blog.octomaker.com$request_uri;
    }
    ```

  - [Request the certificates](https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh ) (Note: [Updated version](https://github.com/koddr/example-static-website-docker-nginx-certbot/blob/master/webserver/register_ssl.sh))

    ```bash
    curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh
    ```
  
    - Edit `init-letsencrypt.sh` with your `domain(s)`,`email` address, and `certbot folder path` you want the script to create
    - Run 

      ```bash
      chmod +x init-letsencrypt.sh
      sudo ./init-letsencrypt.sh.
      ```

  - Automatic Certificate Renewal by adding the following to the `certbot` section of `docker-compose.yml`
  
    ```bash
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
    ```

    > This will check if your certificate is up for renewal every 12 hours as recommended by Let’s Encrypt.
  
  - Reloads `nginx` if there is the newly obtained certificates by adding the following to the `nginx` 
    section of `docker-compose.yml`

    ```bash
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
    ```

  - Deploy project
  
    ```bash
    docker-compose up -d
    ```

  > `APP_PORT` and `APP_PORT_SSL` in `.env` file have to set to `80` and `443` because the container of Certbot will be using ports `80` and `443`.

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
- [Install and Use Docker on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)
- [Install Docker Compose on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04)
  - Check the [current release](https://github.com/docker/compose/releases) and if necessary, update it in the command below

    ```bash
    sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    ```

- Another way
  
  ```bash
  sudo apt update
  sudo apt install -y docker.io git
  sudo usermod -a -G docker ${YOUR_USER}
  sudo service docker start
  sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  ```

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

- Copy whole new `nuxt project` to `app` folder
- Create `Dockerfile` in `app` forder if any
- Change `Dockerfile`. Disable `RUN yarn install` and/or `RUN yarn run build` if there are `node_modules` and/or a prebuild `.nuxt` in `./src/app` folder.
  
  ```bash
  FROM node:10.18.1

  ENV APP_ROOT /src

  RUN mkdir ${APP_ROOT}
  WORKDIR ${APP_ROOT}
  ADD . ${APP_ROOT}

  RUN yarn install
  RUN yarn run build

  ENV HOST 0.0.0.0
  ```

- Change `./nginx/default.conf` with your new domains
- Change `init-letsencrypt.sh` with your `domain(s)` and `email` address

- Request certificates, build and run `nuxt` and `nginx` containers

  ```bash
  chmod +x init-letsencrypt.sh
  sudo ./init-letsencrypt.sh
  ```

- Deploy project
  
  ```bash
  docker-compose up -d
  ```

- If you want to update new source code

  ```bash
  # Stop running containers
  docker-compose stop

  # Remove nuxt container
  docker rm nuxt

  # Remove nuxt image
  docker rm src_nuxt:latest

  # Copy new source code in app folder

  # Deploy project again
  docker-compose up -d
  ```

- If you want to update new nginx config `./nginx/default.conf`
  
  ```bash
  # Stop running containers
  docker-compose stop

  # Change nginx config

  # Deploy project again
  docker-compose up -d
  ```

- [Other commands](https://gist.github.com/jonlabelle/bd667a97666ecda7bbc4f1cc9446d43a)

  ```bash
  # Builds, (re)creates, starts, and attaches to containers for a service.
  docker-compose up

  # Stops containers and removes containers, networks, volumes, and images created by up.
  docker-compose down

  # Starts existing containers for a service.
  docker-compose start

  # Stops running containers without removing them.
  docker-compose stop

  # Pauses running containers of a service.
  docker-compose pause

  # Unpauses paused containers of a service.
  docker-compose unpause

  # Lists containers.
  docker-compose ps

  # View active containers
  docker ps

  # View all containers — active and inactive
  docker ps -a

  # View the latest container you created
  docker ps -l

  # Start container
  docker start ${CONTAINER_ID OR NAME}

  # Stop container
  docker stop ${CONTAINER_ID OR NAME}

  # Restart container
  docker restart ${CONTAINER_ID OR NAME}

  # Remove container
  docker rm ${CONTAINER_ID OR NAME}

  # Remove all stopped containers
  docker rm $(docker ps -a -q)

  # Remove all containers including its volumes use
  docker rm -vf $(docker ps -a -q)

  # List the Docker images
  docker images

  # Remove image
  docker rmi ${IMAGE_ID OR NAME}

  # Remove all images
  # Remember, you should remove all the containers before removing all the images from which those containers were created.
  docker rmi -f $(docker images -a -q)
  ```

### Others

- There is another `default.conf` to redirect www to non-www - [reference](https://dev.to/koddr/how-to-dockerize-your-static-website-with-nginx-automatic-renew-ssl-for-domain-by-certbot-and-deploy-it-to-digitalocean-4cjc)

  ```bash
  # Config for get SSL and redirect to HTTPS
  server {
    listen      80;
    server_name .site.com;

    # Allow only for register SSL (Certbot)
    location ^~ /.well-known/acme-challenge { root /var/www/certbot; }

    # Redirect to HTTPS
    location / { return 301 https://site.com$request_uri; }
  }

  # Redirect to non-WWW
  server {
    listen      443 ssl http2;
    server_name www.site.com;

    # SSL
    ssl_certificate     /etc/letsencrypt/live/site.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/site.com/privkey.pem;

    # Additional Nginx options
    include /etc/letsencrypt/options-ssl-nginx.conf;

    # Diffie-Hellman parameter for DHE ciphersuites
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Redirect to HTTPS
    location / { return 301 https://site.com$request_uri; }
  }

  # Config for HTTPS
  server {
    listen      443 ssl http2;
    server_name site.com;

    # Root & index.html
    root /usr/share/nginx/html;
    index index.html;

    # SSL
    ssl_certificate     /etc/letsencrypt/live/site.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/site.com/privkey.pem;

    # Additional Nginx options
    include /etc/letsencrypt/options-ssl-nginx.conf;

    # Diffie-Hellman parameter for DHE ciphersuites
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # dot files
    location ~ /\.(?!well-known) { deny all; }

    # SEO files
    location = /robots.txt { log_not_found off; }
    location = /sitemap.xml { log_not_found off; }
    location = /favicon.ico { log_not_found off; }

    # Assets, media
    location ~* \.(?:css(\.map)?|js(\.map)?|jpe?g|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
      expires 7d;
    }

    # SVG, fonts
    location ~* \.(?:svgz?|ttf|ttc|otf|eot|woff2?)$ {
      add_header Access-Control-Allow-Origin "*";
      expires 7d;
    }

    # Frontend files
    location / {
      try_files $uri $uri/ /index.html;
    }
  }
  ```

- Tip for small VPS
  - Disable `RUN yarn install` and `RUN yarn run build` in `.app/Dockerfile`
  - Install nuxt packages in `app` folder

    ```bash
    RUN yarn install
    ```

  - Build nux app

    ```bash
    RUN yarn run build
    ```

  - Deploy app
  
    ```bash
    chmod +x init-letsencrypt.sh
    sudo ./init-letsencrypt.sh
    ```

- Updated version of `init-letsencrypt.sh`: [register_ssl.sh](https://github.com/koddr/example-static-website-docker-nginx-certbot/blob/master/webserver/register_ssl.sh)