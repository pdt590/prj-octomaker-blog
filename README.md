# octomaker-blog

> Blog website for octomaker project

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

- Go to [Firebase Console](https://console.firebase.google.com/) -> Add project
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

    https://www.octomaker.com/user/activekey?mode=<action>&oobCode=<code>

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

    https://www.octomaker.com/user/activekey?mode=<action>&oobCode=<code>

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

    https://www.octomaker.com/user/activekey?mode=<action>&oobCode=<code>

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

## TODO

- `Notify Internet Disconnection when saving - [Refer](https://nuxtjs.org/api/$nuxt)`
- `Remove old link when removing a image`
- `404 GET /user/join issue`
- `Remove special characteristic on title (square brackets ...)`
- `Fix long load issue when clicking edit`
- `Implement remember-me login`
- `Improve search performance`
- `Shoud use cloudinary to upload images?`
- `Check problem: reload search page when entering search button`
- Change Category list display on navbar
- Re-check default style - [Refer](https://dev.to/overscoremedia/use-bulma-and-fontawesome-5-with-nuxt-js-11le)
  - Change class style to prefix `_`
  - Button position on modals
  - Fix navbar-item style on Navbar component
  - Fix mobile layout
  - Fix list-style issue for child level
    - Style side-effect on b-pagination 
  - Re-design Logo
  - Change Avatar from square to circle
  - Redesign CardPost - [Refer](https://www.hackster.io/)
  - Change new float style in each post
    - Avatar
- Add recommendation posts in each post
  - Add carousel - [Refer](https://buefy.org/documentation/carousel/)
- Add highlight.js and fix github-css issue
  - [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)
  - [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)
  - [highlightjs](https://github.com/highlightjs/highlight.js)
  - [conflict with highlight.js](https://github.com/sindresorhus/github-markdown-css/issues/52)
  - [vue-hljs](https://github.com/SunskyXH/vue-hljs)
  - [vue-highlight.js](https://github.com/gluons/vue-highlight.js/)
- Add section highlight for each post (Markdown TOC - Table of Content) - [Refer](https://www.jqueryscript.net/blog/best-table-contents-plugins.html)
  - Test `Tocbot` without bulma css
- Implement embed link select
  - Fix responsives iframe issue
- Implement emoji modal select
- Add View image event on editor and post
- Fix min-height editor issue
- Recheck logic in activekey page
- Unify code language using English or Vietnamese or i18n
- Fix autosave issue on login and signup form
- Change bulma.scss to main.scss
- Add like/share fb button
- Seperate Loading state
  - Fix loading button issue
- Fix height of scroll CodeMirror issue