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

- Go to [Firebase Console](https://console.firebase.google.com/) / Add project
- Add an app to get started (Choose Web)
- Get `project config` in Project Setting / Your apps / Firebase SDK snippet / Config

#### Authentication

- Sign-in method
  - Email/Password
- Authorized domains
  - Add domain (octomaker.com)
    - https://kipalog.com/posts/Set-custom-domain-free-cho-Firebase-hosting
    - https://medium.com/google-cloud/google-firebase-hosting-custom-domain-the-missing-manual-7f971c3c2d1e
- Templates
  - Go to  in Action URL (%LINK% value) / customize action URL
    - Add `auth link` of project: `https://www.octomaker.com/user/action?mode=<action>&oobCode=<code>`

  - Email address verification

    ```
    Sender name
    not provided

    From
    noreply@octomaker.com

    Reply to
    not provided

    Subject
    [Octomaker.com] Xác Minh Email

    Message
    Xin chào %DISPLAY_NAME%!

    Truy cập liên kết này để xác minh địa chỉ email của bạn.

    https://www.octomaker.com/user/action?mode=<action>&oobCode=<code>

    Nếu bạn không yêu cầu xác minh địa chỉ email này, bạn có thể bỏ qua email này.

    Cảm ơn bạn!

    Nhóm Octomaker.com
    ```

  - Password reset

    ```
    Sender name
    not provided

    From
    noreply@octomaker.com

    Reply to
    not provided

    Subject
    [Octomaker.com] Đặt Lại Mật Khẩu

    Message
    Xin chào!

    Truy cập liên kết để đặt lại mật khẩu cho tài khoản %EMAIL% .

    https://www.octomaker.com/user/action?mode=<action>&oobCode=<code>

    Nếu bạn không yêu cầu đặt lại mật khẩu, bạn có thể bỏ qua email này.

    Cảm ơn bạn!

    Nhóm Octomaker.com
    ```

  - Email address change

    ```
    Sender name
    not provided

    From
    noreply@octomaker.com

    Reply to
    not provided

    Subject
    [Octomaker.com] Khôi Phục Email

    Message
    Xin chào %DISPLAY_NAME%!

    Email đăng nhập của bạn cho octomaker.com đã thay đổi %NEW_EMAIL%.

    Nếu bạn không yêu cầu thay đổi email, hãy truy cập liên kết này để đặt lại email đăng nhập của bạn.

    https://www.octomaker.com/user/action?mode=<action>&oobCode=<code>

    Cảm ơn bạn!

    Nhóm Octomaker.com
    ```

  - SMS verification

    ```
    Message
    %LOGIN_CODE% là mã xác minh của bạn cho %APP_NAME%.
    ```

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

- [Facebook for web](https://developers.facebook.com/docs/sharing/web)
- [Facebook meta tags](https://developers.facebook.com/docs/sharing/webmasters/)
- [Facebook sharing](https://developers.facebook.com/docs/sharing/best-practices)
- Go to [Facebook developer](https://developers.facebook.com/) / My Apps / Create App / Create a New App ID -> copy and add AppId in `fc.js` & meta tag in `nuxt.config.js`


### Google Analytics