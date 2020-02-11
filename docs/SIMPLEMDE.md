# Notes

## References

- [Tutorial*](https://github.com/F-loat/vue-simplemde/blob/master/README.md)
- [Configuration*](https://github.com/F-loat/vue-simplemde/blob/master/doc/configuration_en.md) - [refer](https://github.com/sparksuite/simplemde-markdown-editor)
- [Sample Code*](https://github.com/F-loat/vue-simplemde/blob/master/examples/index.vue)
- [Sample Code*](https://github.com/F-loat/vue-simplemde/blob/gh-pages/src/App.vue)
- [Demo](https://f-loat.github.io/vue-simplemde/dist/demo.html)
- [Lam trinh soan thao giong Viblo](https://viblo.asia/p/lam-trinh-soan-thao-giong-voi-viblo-Do754JBLZM6)
  - [Code](https://github.com/ththth0303/laravel-vue-coreui/blob/editor/resources/assets/js/admin/views/markdown/index.vue)

- [simplemde-markdown-editor*](https://github.com/sparksuite/simplemde-markdown-editor)
- [CodeMirror*](https://github.com/codemirror/CodeMirror)
- [marked](https://github.com/markedjs/marked)
- [Remarkable](https://github.com/jonschlinkert/remarkable)

- Use other renders
  - [How to disable some tags](https://github.com/F-loat/vue-simplemde/issues/25)
  - [Document preview is ineffective](https://github.com/sparksuite/simplemde-markdown-editor/issues/633)

- Markdown style
  - [markdown-style](https://github.com/F-loat/vue-simplemde#markdown-style)
  - [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)
- Highlight style
  - [Highlight](https://github.com/F-loat/vue-simplemde#highlight)
  - [vue-hljs](https://github.com/SunskyXH/vue-hljs)
  - [highlight.js](https://github.com/highlightjs/highlight.js)

- Others
  - [BubuAnabelas/awesome-markdown](https://github.com/BubuAnabelas/awesome-markdown)
  - [mundimark/awesome-markdown](https://github.com/mundimark/awesome-markdown)

## Issues

- [Error on Nuxt](https://github.com/F-loat/vue-simplemde/issues/75)
- [TypeError: Cannot read property 'simplemde'](https://github.com/F-loat/vue-simplemde/issues/76)
  - [[问题]如果我想](https://github.com/F-loat/vue-simplemde/issues/36)
- [Editor value does not show until click into](https://github.com/F-loat/vue-simplemde/issues/20)
- [Change codemirror options (to disable tabbing and use tab to switch field)](https://github.com/F-loat/vue-simplemde/issues/64)
- Add iframe
  - ["Embed" video feature](https://github.com/sparksuite/simplemde-markdown-editor/issues/225)
  - [How to disable some tags](https://github.com/F-loat/vue-simplemde/issues/25)
  - [simplemde-markdown-editor for iframe](https://github.com/rjriel/simplemde-markdown-editor)
  - [Adding iframe capability](https://github.com/rjriel/marked/commit/aae8a5fd634e08cf0fb4e2b3c7e0c1b6e6bfa5ed)
  - [Marked-Extras (Youtube , Vimeo, DailyMotion, Viddler)*](https://github.com/markedjs/marked/issues/362)
  - [Markdown (marked.js) Media Extras](https://gist.github.com/tunnckoCore/9374172)
  - [iframe is not parsed](https://github.com/markedjs/marked/issues/861)
  - [Search markedjs 'video'](https://github.com/markedjs/marked/issues?utf8=%E2%9C%93&q=is%3Aissue+video+)
  - [youtube url plugin](https://github.com/jonschlinkert/remarkable/issues/274)
  - [Search remarkable 'video'](https://github.com/jonschlinkert/remarkable/issues?utf8=%E2%9C%93&q=is%3Aissue+video+)
  - [remarkable-iframify](https://github.com/noticeableapp/remarkable-iframify)

## Tips

- In order to add a new style, only add new style in `_overrides.scss`
- `github-markdown-css` does not support code highlight. In order to support code highlight, must install 
  3rd-party plugins such as `highlightjs`, `prism` and so on
- `highlightjs`
  - `github-markdown-css` and `highlightjs` style are conflicted together
    - [Conflict with highlight.js](https://github.com/sindresorhus/github-markdown-css/issues/52)
    - `github-markdown-css` maybe compatible with `github.css` style of `highlightjs` 
    - This [github-markdown.css](https://zzzzbw.github.io/github-markdown-css/github-markdown.css) maybe
      compatible with all `highlightjs` styles
    - In vue-simplemde, if set `highlight: true`, it is unnessesary to set `codeSyntaxHighlighting: true`
    - Solution in the project
      - Use new [github-markdown.css](https://zzzzbw.github.io/github-markdown-css/github-markdown.css)
      - For post page, use `vue-hljs`
      - For preview in simpleMDE, use the script and the CSS files
        ``` html
        <script src="https://cdn.jsdelivr.net/highlight.js/latest/highlight.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/highlight.js/latest/styles/github.min.css">
        ```
  - Notes
    - In order to use highlight.js, consider strongly [Getting Started](https://github.com/highlightjs/highlight.js#getting-started)
    - Code highlight before parsing the content with `marked`
      - https://midstride.com/static-vue-cms-part-3/
      - https://github.com/highlightjs/highlight.js/issues/578
- `Prism`
  - [Prism in simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor/issues/138)
  - How to put  `"import "prismjs/themes/prism.css";"` correctly