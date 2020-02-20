# Notes

## References

  - https://dev.to/kiritchoukc/deploy-nuxt-on-firebase-4ad8
  - https://dev.to/sakko/deploying-nuxtjs-on-google-cloud-run-1fic
  - https://dev.to/vuevixens/dockerise-your-nuxt-ssr-app-like-a-boss-a-true-vue-vixens-story-4mm6
  - https://itnext.io/deploying-a-nuxt-universal-app-to-azure-f61e5a85d8a2
  - https://medium.com/@vipercodegames/nuxt-deploy-809eda0168fc

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
- Come back Project Overview > Project Setting > General > Your apps
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
    - Action URL (%LINK% value) > customize action URL > `https://www.octomaker.com/user/action`
    - Waiting for namesilo process about 2 hours (`TTL-7207`) then come back to apply `custom domain`

  - Password reset
    - Project public-facing name > `OctoMaker`
    - Project support email > `pdthang59@gmail.com`
    - Sender name > `OctoMaker Team`
    - From > `norely`
    - customize domain > Add domain `octomaker.com` > Verify domain > Add the DNS records on namsilo
    - Subject > [OctoMaker] Verify Email
    - Action URL (%LINK% value) > customize action URL > `https://www.octomaker.com/user/action`

  - Email address change
    - Project public-facing name > `OctoMaker`
    - Project support email > `pdthang59@gmail.com`
    - Sender name > `OctoMaker Team`
    - From > `norely`
    - customize domain > Add domain `octomaker.com` > Verify domain > Add the DNS records on namsilo
    - Subject > [OctoMaker] Email Changed Notification
    - Action URL (%LINK% value) > customize action URL > `https://www.octomaker.com/user/action`

#### Realtime Database

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
  - [Facebook for web](https://developers.facebook.com/docs/sharing/web)
  - [Facebook meta tags](https://developers.facebook.com/docs/sharing/webmasters/)
  - [Facebook sharing](https://developers.facebook.com/docs/sharing/best-practices)


### Google Analytics

- [How to use Google Analytics in Nuxt?](https://nuxtjs.org/faq/google-analytics/)
- [Google Analytics Nuxt module](https://github.com/nuxt-community/analytics-module)
- [Where do i find the GA tracking id?](https://support.google.com/analytics/thread/13109681?hl=en)
- [Analytic Helps](https://support.google.com/analytics)
- [GA articles on dev.to](https://dev.to/search?q=Google%20Analytics&filters=class_name:Article)

## [Option 1] Firebase Hosting

### Set up Firebase Hosting

- Install Firebase CLI
  
  ```bash
  npm install -g firebase-tools
  ```

- Initialize your project - Open a terminal window and navigate to or create a root directory for your web app
  - Sign in to Google
  
    ```bash
    firebase login
    ```

  - Initiate your project - Run this command from your app’s root directory
  
    ```bash
    firebase login
    ```
  
  - Deploy to Firebase Hosting
    When you’re ready, deploy your web app
    Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory
    
    ```bash
    firebase deploy
    ```

    After deploying, view your app at [octomaker-7e37b.web.app](https://octomaker-7e37b.web.app/)
    Need help? Check out the [Hosting docs](https://firebase.google.com/docs/hosting/quickstart?authuser=1)

  - Continue Console > 

### Setup Domain

- Dashboard > octomaker-7e37b domains > Add custom domain 
  - Enter domain `www.octomaker.com` > Redirect `www.octomaker.com` to an existing website?
  - Verify ownership
    - Add the TXT records below to your DNS provider (namesilo) to verify you own octomaker.com
  - Enter `Verify` 
    - Issue: `We couldn't verify your domain octomaker.com. Please check your settings and try again.` > you have to wait for namesilo process about 2 hours (`TTL-7207`)

- References
  - [DNS Records Explained](https://ns1.com/resources/dns-records-explained)
  - [Demystifying DNS for web developers](https://medium.com/@jgefroh/demystifying-dns-for-web-developers-ace5a3ae559f)
  - Setup domain on namsilo
    - [Hướng dẫn quản lý, trỏ tên miền ở Namesilo](https://canhme.com/kinh-nghiem/huong-dan-quan-ly-ten-mien-o-namesilo/)

  - Custom Domain on Firebase Hosting
    - [Google - Connect a custom domain](https://firebase.google.com/docs/hosting/custom-domain)
    - [Set custom domain free cho Firebase hosting](https://kipalog.com/posts/Set-custom-domain-free-cho-Firebase-hosting)
    - [Google Firebase Hosting & Custom Domain - The Missing Manual](https://medium.com/google-cloud/google-firebase-hosting-custom-domain-the-missing-manual-7f971c3c2d1e)

## [Option 2] VPS