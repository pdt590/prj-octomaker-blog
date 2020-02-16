<template>
  <div :class="{ _disable: disabled }">
    <!-- Start simpleMDE -->
    <!-- Don't work
      :value="markdown" 
      @input="handleInput($event.target.value)"
    -->
    <textarea ref="simplemde" name="simplemde" id="simplemde"></textarea>
    <!-- End simpleMDE -->

    <!-- Start modals -->
    <b-modal
      :active.sync="isModalImageActive"
      has-modal-card
      :can-cancel="false"
    >
      <v-modal-image :value="images" @select="drawImage" />
    </b-modal>
    <b-modal
      :active.sync="isModalLinkActive"
      has-modal-card
      :can-cancel="false"
    >
      <v-modal-link @draw="drawLink" />
    </b-modal>
    <b-modal
      :active.sync="isModalEmbedActive"
      has-modal-card
      :can-cancel="false"
    >
      <v-modal-embed @draw="drawEmbed" />
    </b-modal>
    <!-- End modals -->
  </div>
</template>

<script>
import SimpleMDE from "simplemde";
import Prism from "prismjs";

export default {
  props: {
    value: String,
    images: Array,
    disabled: Boolean
  },
  mounted() {
    this.initialize();
    /* document
      .getElementsByClassName("editor-preview-side")[0]
      .addEventListener("scroll", () => {
        setTimeout(() => {
          Prism.highlightAll();
        }, 1);
      }); */
    /* this.$nextTick(() => {
      document
        .getElementsByClassName("editor-preview-side")[0]
        .addEventListener("scroll", () => {
          setTimeout(() => {
            Prism.highlightAll();
          }, 1);
        });
    }); */
  },
  watch: {
    value(arg) {
      Prism.highlightAll();
      if (this.isValueUpdatedFromInside) {
        this.isValueUpdatedFromInside = false;
        return;
      }
      this.simplemde.value(arg);
      this.markdown = arg;
    }
  },
  data() {
    return {
      simplemde: null,
      codemirror: null,
      markdown: "",
      isValueUpdatedFromInside: false,
      previewClass: "content markdown-body",
      configs: {
        element: this.$refs.simplemde,
        initialValue: this.value,
        autofocus: true,
        placeholder: `Content format: \n # Introduction \n - Describe overall your post \n - Don't use picture/bullet/link \n # Content \n - Write your post`,
        spellChecker: false,
        tabSize: 4,
        forceSync: true,
        /* previewRender: function(plainText, preview) {
          setTimeout(
            function() {
              preview.innerHTML = this.parent.markdown(plainText);
              Prism.highlightAll();
            }.bind(this),
            1
          );
          return "Loading...";
        }, */
        toolbar: [
          "bold",
          "italic",
          "strikethrough",
          "heading-1",
          "heading-2",
          "heading-3",
          "|",
          "code",
          "quote",
          "unordered-list",
          "ordered-list",
          "table",
          "horizontal-rule",
          "clean-block",
          "|",
          //"link",
          {
            name: "link",
            action: () => {
              this.isModalLinkActive = true;
            },
            className: "fa fa-link",
            title: "Draw Link"
          },
          //"image",
          {
            name: "image",
            action: () => {
              this.isModalImageActive = true;
            },
            className: "fa fa-image",
            title: "Upload Image"
          },
          {
            name: "embed",
            action: () => {
              this.isModalEmbedActive = true;
            },
            className: "fa fa-file-code-o",
            title: "Draw Embed"
          },
          "|",
          //"preview",
          {
            name: "preview",
            action: () => {
              this.simplemde.togglePreview();
              Prism.highlightAll();
            },
            className: "fa fa-eye no-disable",
            title: "Toggle Preview (Ctrl-P)"
          },
          "side-by-side",
          /* {
            name: "side-by-side",
            action: () => {
              this.simplemde.toggleSideBySide();
              setTimeout(() => {
                Prism.highlightAll();
              }, 1);
            },
            className: "fa fa-columns no-disable no-mobile",
            title: "Toggle Side-by-Side (F9)"
          }, */
          "fullscreen",
          "|",
          "undo",
          "redo",
          "|",
          {
            name: "guide",
            action: () => {
              window.open(
                "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet",
                "_blank"
              );
            },
            className: "fa fa-question-circle",
            title: "Help"
          },
          {
            name: "emoji",
            action: () => {
              window.open("https://gist.github.com/rxaviers/7360908", "_blank");
            },
            className: "fa fa-smile-o",
            title: "Emoji"
          },
          {
            name: "test",
            action: () => {
              console.log("simplemde", this.simplemde);
              console.log("codemirror", this.codemirror);
            },
            className: "fa fa-commenting-o",
            title: "Click for Test"
          }
        ]
      },
      isModalLinkActive: false,
      isModalImageActive: false,
      isModalEmbedActive: false
    };
  },
  methods: {
    initialize() {
      this.simplemde = new SimpleMDE(this.configs);
      this.codemirror = this.simplemde.codemirror;
      this.addPreviewClass(this.previewClass);
      this.bindingEvents();
    },
    bindingEvents() {
      this.codemirror.on("change", () => {
        const value = this.simplemde.value();
        this.handleInput(value);
      });
      this.codemirror.on("viewportChange", () => {
        Prism.highlightAll();
      });
      this.codemirror.on("refresh", () => {
        setTimeout(() => {
          Prism.highlightAll();
        }, 1);
      });
    },
    addPreviewClass(className) {
      // Fetch <div class="CodeMirror" />
      const wrapper = this.codemirror.getWrapperElement();

      // Add new class for <div class="editor-preview /> inside <div class="CodeMirror" />
      const preview = document.createElement("div");
      preview.className = `editor-preview ${className}`;
      preview.setAttribute("v-highlight", "");
      preview.setAttribute("ref", "preview");
      wrapper.appendChild(preview);

      // Add new class for <div class="editor-preview-side />
      wrapper.nextSibling.className += ` ${className}`;
      wrapper.nextSibling.setAttribute("v-highlight", "");
      wrapper.nextSibling.setAttribute("ref", "preview");
    },
    handleInput(arg) {
      this.isValueUpdatedFromInside = true;
      this.$emit("input", arg);
    },

    /* Start simplemde events */
    drawImage(image) {
      this.codemirror.replaceSelection(`![](${image.url})`);
      this.isModalImageActive = false;
      setTimeout(
        function() {
          this.codemirror.focus();
        }.bind(this),
        1
      );
    },
    drawLink(link) {
      window.prompt = () => {
        return link;
      };
      this.simplemde.drawLink();
      this.isModalLinkActive = false;
    },
    drawEmbed(link) {
      this.codemirror.replaceSelection(`{@embed: ${link}}`);
      this.isModalEmbedActive = false;
      setTimeout(
        function() {
          this.codemirror.focus();
        }.bind(this),
        1
      );
    }
    /* End simplemde events */
  }
};
</script>
