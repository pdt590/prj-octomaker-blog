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

## Firebase Hosting Setup

### References

- [Deploy nuxt on Firebase](https://dev.to/kiritchoukc/deploy-nuxt-on-firebase-4ad8)
  - [Source code](https://github.com/KiritchoukC/nuxt-on-firebase-example)
- [Create a SSR + Serverless App](https://itnext.io/how-to-create-a-ssr-serverless-app-with-firebase-nuxt-js-in-an-hour-6e6e03d0b3b8)
- [Part 1 - Server-Side Render Vue Apps with Nuxt.js And Firebase! App Example](https://www.youtube.com/watch?v=TjQsOy-8Wqo)
- [Part 2 - Server-Side Render Vue Apps with Nuxt.js And Firebase!](https://www.youtube.com/watch?v=ix22-aX69qo)

### Get Started

- Setup Domain
  - References
    - [DNS Records Explained](https://ns1.com/resources/dns-records-explained)
    - [Demystifying DNS for web developers](https://medium.com/@jgefroh/demystifying-dns-for-web-developers-ace5a3ae559f)
    - Setup domain on namsilo
      - [Hướng dẫn quản lý, trỏ tên miền ở Namesilo](https://canhme.com/kinh-nghiem/huong-dan-quan-ly-ten-mien-o-namesilo/)

    - Custom Domain on Firebase Hosting
      - [Google - Connect a custom domain](https://firebase.google.com/docs/hosting/custom-domain)
      - [Set custom domain free cho Firebase hosting](https://kipalog.com/posts/Set-custom-domain-free-cho-Firebase-hosting)
      - [Google Firebase Hosting & Custom Domain - The Missing Manual](https://medium.com/google-cloud/google-firebase-hosting-custom-domain-the-missing-manual-7f971c3c2d1e)
  - Dashboard > octomaker-7e37b domains > Add custom domain 
  - Enter domain `blog.octomaker.com` > Untick `Redirect Checkbox`
  - Verify ownership
    - Add the TXT records below to your DNS provider (namesilo) to verify you own octomaker.com
      > Recommend to set `TTL-3603`
    - Enter `Verify` 
      - Issue: `We couldn't verify your domain octomaker.com. Please check your settings and try again.` > you have to wait for namesilo process about 2 hours (`TTL-7207`)
    - Add these A records to your domain by visiting your DNS provider or registrar (namesilo). Remember to remove your old A records and any AAAA records from your DNS provider

      | Record type   | Host                  | Value            |
      | ------------- |-----------------------|------------------|
      | A             | blog.octomaker.com    | 151.101.1.195    |
      | A             | blog.octomaker.com    | 151.101.65.195   |

- Dashboard > octomaker-7e37b domains > Add custom domain 
  - Enter domain `octomaker.com` > Tick `Redirect Checkbox` > Redirect domain `blog.octomaker.com`
  - Enter `Verify` 
  - Add these A records to your domain by visiting your DNS provider or registrar (namesilo). Remember to remove your old A records and any AAAA records from your DNS provider

    | Record type   | Host                  | Value            |
    | ------------- |-----------------------|------------------|
    | A             | octomaker.com         | 151.101.1.195    |
    | A             | octomaker.com         | 151.101.65.195   |
- Do simililarly in the redirect case of `www.octomaker.com`
  - Add these A records to your domain by visiting your DNS provider or registrar (namesilo). Remember to remove your old A records and any AAAA records from your DNS provider

    | Record type   | Host                  | Value            |
    | ------------- |-----------------------|------------------|
    | A             | www.octomaker.com     | 151.101.1.195    |
    | A             | www.octomaker.com     | 151.101.65.195   |

- Do simililarly in the redirect case of `www.blog.octomaker.com`
  - Add these A records to your domain by visiting your DNS provider or registrar (namesilo). Remember to remove your old A records and any AAAA records from your DNS provider

    | Record type   | Host                  --| Value            |
    | ------------- |-------------------------|------------------|
    | A             | www.blog.octomaker.com  | 151.101.1.195    |
    | A             | www.blog.octomaker.com  | 151.101.65.195   |

- Install Firebase CLI
  
  ```bash
  npm i -g firebase-tools
  ```

- Login with this command

  ```bash
  firebase login
  ```

- Refactor project structure
  - `src`: This is where our development files sit
  - `functions`: This is where our SSR function will be
  - `public`: This directory will hold the files that will be served by Firebase hosting

  > The app is broken now! Let's fix it by updating the nuxt config

- In nuxt.config.js, add the following lines in module.exports

  ```bash
  module.exports = {
    ...
    # change new source code dir
    srcDir: 'src',

    # change generated build folder location
    buildDir: 'functions/.nuxt',
    ...
  }
  ```

  > You dont need to change `dev` and `start` scripts as in [Deploy nuxt on Firebase](https://dev.to/kiritchoukc/deploy-nuxt-on-firebase-4ad8) tutorial,
    because this project uses default nuxt server, and the scripts run based on `nuxt.config.js` that is same folder with `package.json` file.

- Add firebase to the project

  ```bash
  firebase init
  ```

- The CLI will ask you some questions and here are the answers
  
  ```bash
  ? Are you ready to proceed?
  > Yes

  ? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.
  > Functions: Configure and deploy Cloud Functions,
  > Hosting: Configure and deploy Firebase Hosting sites

  ? Please select an option:
  > Use an existing project
  (Select the project we created earlier)

  ? What language would you like to use to write Cloud Functions? (Use arrow keys)
  > JavaScript

  ? Do you want to use ESLint to catch probable bugs and enforce style? (y/N)
  > y

  ? Do you want to install dependencies with npm now? (Y/n)
  > Y

  ? What do you want to use as your public directory? (public)
  > public

  ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
  > N
  ```

  > A wild public directory appeared! Our project structure is now complete

- Open the `functions/index.js` file, remove everything and paste the code below

  ```js
  const functions = require('firebase-functions')
  const { Nuxt } = require('nuxt')
  const express = require('express')

  const app = express()

  const config = {
    dev: false
  }

  const nuxt = new Nuxt(config)

  let isReady = false
  const readyPromise = nuxt
    .ready()
    .then(() => {
      isReady = true
    })
    .catch(() => {
      process.exit(1)
    })

  async function handleRequest(req, res) {
    if (!isReady) {
      await readyPromise
    }
    res.set('Cache-Control', 'public, max-age=1, s-maxage=1')
    await nuxt.render(req, res)
  }

  app.get('*', handleRequest)
  app.use(handleRequest)
  exports.nuxtssr = functions.https.onRequest(app)
  ```

  > To sum it up, on each reqest, the function will pass the response and request object to the `nuxt.render(req, res)` function which will handle the app rendering.

  > Note: `dev: false`

- The function will need the same libraries as your nuxt app. Copy the `package.json` dependencies to the `functions/package.json` dependencies
- At the time of writing this article, firebase supports `node version 10`. In `functions/package.json` you can update the node engine version from `8` to `10`.
- Install all `packages` at root folder for nuxt project if any 

  ```bash
  yarn install
  ```

- Go to `functions` folder and install all `packages`  for firebase if the default firebase installation is broken

  ```bash
  cd functions
  yarn install
  ```

- Updating `firebase.json`. Replace the whole file with
  
  ```bash
  {
    "hosting": {
      "public": "public",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [
        {
          "source": "**",
          "function": "nuxtssr"
        }
      ]
    }
  }
  ```

  > It will redirect all the requests to the function we've made

  > Note: `"function": "nuxtssr"` is equivalent with `exports.nuxtssr = functions.https.onRequest(app)` in `functions/index.js` file


- `static files` of the nuxt project after build have to be in the `public` directory
  - How to copy `static files` of nuxt project to `public` directory
    1. `Clean` the directories in case there's already something in it
    2. `Build` the nuxt app
    3. The built app is now in the functions directory. Copy the content of the `functions/.nuxt/dist/` directory to the `public/_nuxt` directory
    4. Copy the static files from the `src/static/` directory to the `root` of the `public` directory
    5. Install the functions dependencies with yarn

- These scripts will do all that in `windows`. Add these to the main `package.json` file.

  ```bash
  "build": "nuxt build",
  
  "build:firebase": "yarn clean && yarn build && yarn copy && cd \"functions\" && yarn",

  "clean": "yarn clean:public && yarn clean:functions && yarn clean:static",
  "clean:functions": "rimraf \"functions/node_modules\" && rimraf \"functions/.nuxt\"",
  "clean:public": "rimraf \"public/**/*.*!(md)\" && rimraf \"public/_nuxt\"",
  "clean:static": "rimraf \"src/static/sw.js\"",

  "copy": "yarn copy:nuxt && yarn copy:static",
  "copy:nuxt": "xcopy \"functions\\.nuxt\\dist\\*\" \"public\\_nuxt\\\" /E /Y",
  "copy:static": "xcopy \"src\\static\\*\" \"public\\\" /E /Y",

  "start:firebase": "firebase serve --only functions,hosting",

  "deploy": "firebase deploy --only functions,hosting"
  ```

- MacOs version. Still having issues? [James Block comment](https://dev.to/meanjames/comment/leln) might help you

  ```bash
  "scripts": {
    // ...
    "build:firebase": "yarn clean && yarn build && yarn copy && cd functions && yarn",

    "clean": "yarn clean:public && yarn clean:functions && yarn clean:static",
    "clean:functions": "rimraf \"functions/node_modules\" && rimraf \"functions/.nuxt\"",
    "clean:public": "rimraf \"public/**/*.*!(md)\" && rimraf \"public/_nuxt\"",
    "clean:static": "rimraf \"src/static/sw.js\"",

    "copy": "yarn copy:nuxt && yarn copy:static",
    "copy:nuxt": "mkdir public/_nuxt && cp -r functions/.nuxt/dist/* public/_nuxt",
    "copy:static": "cp -r src/static/* public",

    "start:firebase": "firebase serve --only functions,hosting",

    "deploy": "firebase deploy --only functions,hosting",

    // ...
  }
  ````

  > Why is it `public/_nuxt`?

  > Why is it `"clean:static": "rimraf \"src/static/sw.js\""`

- You can now launch these commands
  - Deploy app to firebase
  
    ```bash
    yarn build:firebase
    yarn deploy
    ```

  - Deploy app to emulator

    ```bash
    yarn build:firebase
    yarn start:firebase
    ```

  - For development without firebase
  
    ```bash
    yarn dev
    ```

### Summary - Setup for the future project

- Clone git repo
  
  ```bash
  git clone https://github.com/pdthang/octomaker-blog.git src
  cd src
  ```

- Install Firebase CLI if any
  
  ```bash
  npm i -g firebase-tools
  ```

- Login with this command if any

  ```bash
  firebase login
  ```

- In `.firebaserc`, change your `firebase project name` you created
- Copy whole new `nuxt project` or only `folders` of new `nuxt project` to `src`
- Replace `package.json` in root folder with new `package.json` of nuxt app
- Copy the `package.json` dependencies of nuxt app to the `functions/package.json` dependencies
  - Don't remove
  
  ```bash
  "firebase-admin": "^x.x.x",
  "firebase-functions": "^x.x.x"
  ```

- Replace `nuxt.config.js` in root folder to new `nuxt.config.js` of nuxt app 
- Add the following lines in `nuxt.config.js`

  ```bash
  module.exports = {
    ...
    # change new source code dir
    srcDir: 'src',

    # change generated build folder location
    buildDir: 'functions/.nuxt',
    ...
  }
  ```

- Install all `packages` at root folder for nuxt project

  ```bash
  # root folder
  yarn install
  ```

- Go to `functions` folder and install all `packages`  for firebase if the default firebase installation is broken

  ```bash
  # functions folder
  yarn install
  ```

- Deploy app to firebase

  ```bash
  # root folder
  yarn build:firebase
  yarn deploy
  ```

- Deploy app to emulator

  ```bash
  # root folder
  yarn build:firebase
  yarn start:firebase
  ```